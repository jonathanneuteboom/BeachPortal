from BeachPortalApi.Team.Serializers import TeamSerializer
from rest_framework import serializers


class StandItemSerializer(serializers.Serializer):
    puntenVoor = serializers.IntegerField()
    puntenTegen = serializers.IntegerField()
    quotient = serializers.FloatField()
    gewonnenWedstrijden = serializers.IntegerField()

    team = TeamSerializer()
