from BeachPortalApi.Team.TeamSerializers import TeamSerializer
from BeachPortalApi.Wedstrijd.Wedstrijd import Wedstrijd
from rest_framework import serializers


class WedstrijdSerializer(serializers.ModelSerializer):
    team1 = serializers.SerializerMethodField()
    team2 = serializers.SerializerMethodField()

    class Meta:
        model = Wedstrijd
        fields = ["id", "team1", "team2", "puntenTeam1", "puntenTeam2"]

    def get_team1(self, instance):
        return instance.team1.naam

    def get_team2(self, instance):
        return instance.team2.naam
