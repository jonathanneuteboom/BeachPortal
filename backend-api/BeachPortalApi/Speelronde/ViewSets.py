from datetime import timedelta
from unicodedata import category

from BeachPortalApi.Poule.Poule import Poule
from BeachPortalApi.Speelronde.Speelronde import Speelronde
from BeachPortalApi.Speelronde.SpeelrondeSerializers import \
    SpeelrondeSerializer
from BeachPortalApi.Wedstrijd.Wedstrijd import Wedstrijd
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response


class CreateSpeelrondeViewSet(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def create(self, request):
        currentSpeelronde = Speelronde.getCurrentSpeelronde()
        if currentSpeelronde == None:
            return

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

        for poule in oldPoules:
            stand = poule.getStand()
            aantalTeams = len(stand)
            if aantalTeams <= 1:
                continue

            newPoule = Poule.objects.get(
                speelronde=newSpeelronde,
                categorie=poule.categorie,
                nummer=poule.nummer
            )

            # promote first team
            firstTeam = stand[0].team
            if poule.nummer == 1:
                newPoule.teams.add(firstTeam)
            else:
                higherPoule = Poule.objects.get(
                    speelronde=newSpeelronde,
                    categorie=poule.categorie,
                    nummer=poule.nummer-1
                )
                higherPoule.teams.add(firstTeam)

            # keep middle teams in the same place
            for i in range(1, aantalTeams-1):
                newPoule.teams.add(stand[i].team)

            lastPouleInSpeelronde = newSpeelronde.poules.filter(categorie=poule.categorie).order_by('-nummer').first()
            if lastPouleInSpeelronde == None:
                raise Exception()

            # demote last team
            lastTeam = stand[-1].team
            if lastPouleInSpeelronde.nummer == poule.nummer:
                newPoule.teams.add(lastTeam)
            else:
                lowerPoule = Poule.objects.get(
                    speelronde=newSpeelronde,
                    categorie=poule.categorie,
                    nummer=poule.nummer+1
                )
                lowerPoule.teams.add(lastTeam)

        for poule in newSpeelronde.poules.all():
            self.addWedstrijden(poule)

        return Response()

    def demote(self, poule, team):
        poule.teams.remove(team)

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
        if speelronde == None:
            return

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
