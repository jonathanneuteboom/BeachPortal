from datetime import timedelta
from rest_framework.response import Response
from BeachPortalApi.Poule.models import Poule
from BeachPortalApi.Speelronde.Serializers import SpeelrondeSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from rest_framework import generics
from django.db.models import Q
from rest_framework import status

from BeachPortalApi.Speelronde.models import Speelronde
from BeachPortalApi.Wedstrijd.models import Wedstrijd


class CreateSpeelrondeViewSet(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def create(self, request):
        currentSpeelronde = Speelronde.getCurrentSpeelronde()
        if currentSpeelronde == None:
            Speelronde(nummer=1).save()

        pouleIds = currentSpeelronde.poules.values_list('id', flat=True)
        wedstrijden = Wedstrijd.objects.filter(poule_id__in=pouleIds)

        gespeeldeWedstrijd = 0
        for wedstrijd in wedstrijden:
            if wedstrijd.puntenTeam1 > 0 or wedstrijd.puntenTeam2 > 0:
                gespeeldeWedstrijd += 1

        if gespeeldeWedstrijd == 0:
            return Response('Er zijn nog geen wedstrijden gespeeld', status=status.HTTP_400_BAD_REQUEST)

        newSpeelronde = Speelronde(nummer=currentSpeelronde.nummer + 1)
        newSpeelronde.save()

        oldPoules = currentSpeelronde.poules.all()
        for poule in oldPoules:
            newPoule = Poule(
                speelronde=newSpeelronde,
                categorie=poule.categorie,
                nummer=poule.nummer,
                speeltijd=poule.speeltijd + timedelta(weeks=1),
                speellocatie=poule.speellocatie
            )
            newPoule.save()
            teams = Poule.objects.get(pk=poule.id).teams.all()
            newPoule.teams.set(teams)

        newPoules = newSpeelronde.poules.all()
        for poule in newPoules:
            stand = poule.getStand()
            if len(stand) <= 1:
                continue

            if poule.nummer != 1:
                firstTeam = stand[0].team
                self.promote(poule, firstTeam)

            lastPouleInSpeelronde = newSpeelronde.poules.filter(
                categorie=poule.categorie,
                speelronde=poule.speelronde
            ).order_by('-nummer').first()
            if lastPouleInSpeelronde.id != poule.id:
                lastTeam = stand[-1].team
                self.demote(poule, lastTeam)

        for poule in newPoules:
            self.addWedstrijden(poule)

        return Response()

    def promote(self, poule, team):
        poule.teams.remove(team)
        higherPoule = Poule.objects.get(
            speelronde=poule.speelronde,
            categorie=poule.categorie,
            nummer=poule.nummer-1
        )
        higherPoule.teams.add(team)

    def demote(self, poule, team):
        poule.teams.remove(team)
        lowerPoule = Poule.objects.get(
            speelronde=poule.speelronde,
            categorie=poule.categorie,
            nummer=poule.nummer+1
        )
        lowerPoule.teams.add(team)

    def addWedstrijden(self, poule):
        teams = Poule.objects.prefetch_related(
            'teams'
        ).get(pk=poule.pk).teams.all()
        aantalTeams = teams.count()
        for i, _ in enumerate(teams):
            for j in range(i+1, aantalTeams):
                Wedstrijd(
                    poule=poule,
                    team1=teams[i],
                    team2=teams[j],
                    puntenTeam1=0,
                    puntenTeam2=0
                ).save()


class DeleteSpeelrondeViewSet(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def delete(self, request):
        speelronde = Speelronde.getCurrentSpeelronde()
        if speelronde.nummer == 1:
            return Response('De eerste speelronde kan niet worden verwijderd', status=status.HTTP_400_BAD_REQUEST)

        pouleIds = speelronde.poules.values_list('id', flat=True)
        gespeeldeWedstrijden = Wedstrijd.objects.filter(
            Q(poule_id__in=pouleIds),
            Q(puntenTeam1__gt=0) | Q(puntenTeam2__gt=0)
        ).count()

        if gespeeldeWedstrijden > 0:
            return Response('De poule heeft al gespeelde wedstrijden', status=status.HTTP_400_BAD_REQUEST)

        speelronde.delete()

        return Response()


class GetCurrentSpeelrondeViewSet(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = SpeelrondeSerializer(
            Speelronde.getCurrentSpeelronde())
        return Response(serializer.data)


class GetAllSpeelrondesViewSet(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = SpeelrondeSerializer(Speelronde.objects.all(), many=True)
        return Response(serializer.data)
