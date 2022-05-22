from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from django.db.models import Q
from BeachPortalApi.Categorie.models import Categorie

from BeachPortalApi.Poule.Serializers import PouleSerializer
from BeachPortalApi.Poule.models import Poule
from BeachPortalApi.Speellocatie.models import Speellocatie
from BeachPortalApi.Speelronde.models import Speelronde


from BeachPortalApi.Team.models import Team
from BeachPortalApi.Wedstrijd.models import Wedstrijd


class NewPouleViewSet(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def create(self, request):
        categorie = request.data.get('categorie')

        speelronde = Speelronde.getCurrentSpeelronde()
        laagstePoule = speelronde.poules.filter(
            categorie=categorie
        ).order_by('-nummer').first()

        if laagstePoule == None:
            speellocatie = Speellocatie.objects.first()
            speeltijd = datetime.today().replace(hour=16, minute=00)
            nummer = 1
        else:
            speellocatie = laagstePoule.speellocatie
            speeltijd = laagstePoule.speeltijd + timedelta(hours=1)
            nummer = laagstePoule.nummer+1

        Poule(
            speelronde=speelronde,
            speellocatie=speellocatie,
            categorie=categorie,
            nummer=nummer,
            speeltijd=speeltijd
        ).save()

        return Response()


class OverlappingPouleViewSet(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response([])


class PouleViewSet(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    queryset = Poule.objects.all()
    serializer_class = PouleSerializer

    def get(self, request, pouleId):
        serializer = PouleSerializer(
            self.queryset.prefetch_related('wedstrijden').get(pk=pouleId))

        return Response(serializer.data)

    def put(self, request, pouleId):
        poule = self.queryset.get(pk=pouleId)

        speeltijd = request.data.get('speeltijd')
        speellocatieId = request.data.get('speellocatieId')
        speellocatie = Speellocatie.objects.get(pk=speellocatieId)

        poule.speeltijd = speeltijd
        poule.speellocatie = speellocatie
        poule.save()

        return Response()

    def delete(self, request, pouleId):
        poule = self.queryset.get(pk=pouleId)
        laatstePoule = Poule.objects.filter(
            speelronde=poule.speelronde,
            categorie=poule.categorie
        ).order_by('-nummer')[0]
        if (laatstePoule.id != pouleId):
            return Response('Alleen laatste poule kan verwijderd worden', status=status.HTTP_400_BAD_REQUEST)

        poule = self.queryset.get(pk=pouleId)
        if poule.teams.count() > 0:
            return Response('Poule is nog niet leeg', status=status.HTTP_400_BAD_REQUEST)

        poule.delete()

        return Response()


class MyPoulesView(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = get_object_or_404(get_user_model(), pk=request.user.id)

        myTeams = Poule.objects.filter(
            teams__spelers__in=[user]).order_by('categorie', 'nummer')
        serializer = PouleSerializer(myTeams, many=True)
        return Response(serializer.data)


class PouleTeamViewSet(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    serializer_class = PouleSerializer

    def post(self, request, pouleId, teamId):
        poule = Poule.objects.prefetch_related('teams').get(pk=pouleId)
        newTeam = Team.objects.get(pk=teamId)

        for team in poule.teams.all():
            if team.id == newTeam.id:
                return Response('Team zit al in deze poule', status=status.HTTP_400_BAD_REQUEST)

        anderePoule = Poule.objects.filter(
            ~Q(id=poule.id),
            Q(teams__in=[newTeam.id]),
            speelronde=poule.speelronde
        ).first()
        if anderePoule:
            return Response(f'Team zit al in Poule {anderePoule.nummer} ({Categorie(anderePoule.categorie).label})', status=status.HTTP_400_BAD_REQUEST)

        for team in poule.teams.all():
            Wedstrijd(
                poule=poule,
                team1=team,
                team2=newTeam,
                puntenTeam1=0,
                puntenTeam2=0
            ).save()

        poule.teams.add(newTeam)

        return Response()

    def delete(self, request, pouleId, teamId):
        poule = Poule.objects.get(pk=pouleId)
        team = Team.objects.get(pk=teamId)

        wedstrijden = Wedstrijd.objects.filter(
            Q(poule=poule),
            Q(team1=team) | Q(team2=team)
        )

        for wedstrijd in wedstrijden:
            if wedstrijd.puntenTeam1 > 0 or wedstrijd.puntenTeam2 > 0:
                return Response('Team heeft gespeelde wedstrijden', status=status.HTTP_400_BAD_REQUEST)

        wedstrijden.delete()
        poule.teams.remove(team)

        return Response()
