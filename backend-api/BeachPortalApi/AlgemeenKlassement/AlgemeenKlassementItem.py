from __future__ import annotations

from BeachPortalApi.Speelronde.Speelronde import Speelronde
from BeachPortalApi.Team.Team import Team
from BeachPortalApi.Team.TeamSerializers import TeamSerializer
from rest_framework import serializers


class AlgemeenKlassementItemSerializer(serializers.Serializer):
    punten = serializers.ListField()
    totaal = serializers.IntegerField()
    team = TeamSerializer()


class AlgemeenKlassementItem():
    punten = []
    totaal = 0

    def __lt__(self, other: AlgemeenKlassementItem):
        return self.totaal > other.totaal

    def __init__(self, team: Team, aantalSpeelrondes: int):
        self.team = team
        self.punten = [0] * aantalSpeelrondes

    def addPunten(self, speelronde: Speelronde, punten: int):
        self.punten[speelronde.nummer - 1] = punten
        self.totaal += punten
