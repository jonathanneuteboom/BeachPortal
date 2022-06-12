from BeachPortalApi.AlgemeenKlassement.AlgemeenKlassement import (
    AlgemeenKlassement,
    AlgemeenKlassementSerializer,
)
from BeachPortalApi.AlgemeenKlassement.AlgemeenKlassementItem import (
    AlgemeenKlassementItem,
)
from BeachPortalApi.Categorie.models import Categorie
from BeachPortalApi.Poule.Poule import Poule
from BeachPortalApi.Speelronde.Speelronde import Speelronde
from BeachPortalApi.Stand.StandItem import StandItem
from BeachPortalApi.Team.Team import Team
from django.db.models import QuerySet
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class AlgemeenKlassementViewSet(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        algemeenKlassement = []

        categorien = [Categorie("D"), Categorie("H"), Categorie("X")]

        speelrondes = Speelronde.getAllSpeelrondes()
        aantalSpeelrondes = speelrondes.count()

        for categorie in categorien:
            klassement = []

            for team in Team.getTeamsByCategorie(categorie).all():
                newItem = AlgemeenKlassementItem(team, aantalSpeelrondes)
                klassement.append(newItem)

            for speelronde in speelrondes:
                baseScore = 1

                poules: QuerySet[Poule] = speelronde.getPoulesByCategorie(
                    categorie
                ).order_by("-nummer")
                for poule in poules:
                    standItems: list[StandItem] = poule.getStand()
                    numberOfTeams = len(standItems)

                    for punten, standItem in enumerate(reversed(standItems)):
                        findTeam = (
                            i
                            for i, algemeenKlassementItem in enumerate(klassement)
                            if algemeenKlassementItem.team.id == standItem.team.id
                        )
                        teamIndex = next(findTeam)

                        score = baseScore + punten
                        klassement[teamIndex].addPunten(speelronde, score)

                    baseScore += numberOfTeams - 1

            klassement.sort()

            newKlassment = AlgemeenKlassement(categorie, klassement)
            algemeenKlassement.append(newKlassment)

        serializer = AlgemeenKlassementSerializer(algemeenKlassement, many=True)

        return Response(serializer.data)
