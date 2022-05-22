
from rest_framework import serializers
from BeachPortalApi.Team.Serializers import TeamSerializer


class StandItemSerializer(serializers.Serializer):
    puntenVoor = serializers.IntegerField()
    puntenTegen = serializers.IntegerField()
    quotient = serializers.FloatField()
    gewonnenWedstrijden = serializers.IntegerField()

    team = TeamSerializer()
