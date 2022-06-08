from BeachPortalApi.Team.TeamSerializers import TeamSerializer
from BeachPortalApi.Wedstrijd.Wedstrijd import Wedstrijd
from rest_framework import serializers


class WedstrijdSerializer(serializers.ModelSerializer):
    team1 = TeamSerializer()
    team2 = TeamSerializer()

    class Meta:
        model = Wedstrijd
        fields = ['id', 'team1', 'team2', 'puntenTeam1', 'puntenTeam2']
