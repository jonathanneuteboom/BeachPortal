from BeachPortalApi.Categorie.models import Categorie
from BeachPortalApi.Speelronde.Speelronde import Speelronde
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from BeachPortalApi.Team.models import Team

from BeachPortalApi.Team.Serializers import TeamSerializer
from rest_framework import serializers


class AlgemeenKlassement():
    categorie = None
    ranking = []

    def __init__(self, categorie, ranking):
        self.categorie = categorie
        self.ranking = ranking


class AlgemeenKlassementItemSerializer(serializers.Serializer):
    punten = serializers.ListField()
    totaal = serializers.IntegerField()
    team = TeamSerializer()


class AlgemeenKlassementSerializer(serializers.Serializer):
    categorie = serializers.CharField(source='categorie.label')
    ranking = AlgemeenKlassementItemSerializer(many=True)


class AlgemeenKlassementItem():
    punten = []
    totaal = 0

    def __lt__(self, other):
        return self.totaal > other.totaal

    def __init__(self, team, aantalSpeelrondes):
        self.team = team
        self.punten = [0] * aantalSpeelrondes

    def addPunten(self, punten, speelronde):
        self.punten[speelronde] = punten
        self.totaal += punten


class AlgemeenKlassementViewSet(generics.ListAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        algemeenKlassement = []

        aantalSpeelrondes = Speelronde.objects.count()

        categorien = [Categorie('D'), Categorie('H'), Categorie('X')]

        speelrondes = Speelronde.objects.prefetch_related(
            'poules').order_by('nummer').all()

        for categorie in categorien:
            klassement = []

            for team in Team.objects.filter(categorie=categorie):
                newItem = AlgemeenKlassementItem(team, aantalSpeelrondes)
                klassement.append(newItem)

            for speelrondeIndex, speelronde in enumerate(speelrondes):
                score = 1

                poules = speelronde.poules.filter(
                    categorie=categorie
                ).order_by('-nummer')
                for poule in reversed(poules):
                    standItems = poule.getStand()
                    firstPlace = standItems[0]
                    for standItem in reversed(standItems):
                        findTeam = (i for i, algemeenKlassementItem in enumerate(
                            klassement) if algemeenKlassementItem.team.id == standItem.team.id)
                        teamIndex = next(findTeam)

                        klassement[teamIndex].addPunten(score, speelrondeIndex)

                        if (firstPlace.team.id != standItem.team.id):
                            score += 1

            klassement.sort()

            newKlassment = AlgemeenKlassement(categorie, klassement)
            algemeenKlassement.append(newKlassment)

        serializer = AlgemeenKlassementSerializer(
            algemeenKlassement, many=True)

        return Response(serializer.data)
