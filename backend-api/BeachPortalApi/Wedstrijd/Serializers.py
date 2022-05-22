
from rest_framework import serializers
from BeachPortalApi.Team.Serializers import TeamSerializer

from BeachPortalApi.Wedstrijd.models import Wedstrijd


class WedstrijdSerializer(serializers.ModelSerializer):
    team1 = TeamSerializer()
    team2 = TeamSerializer()

    class Meta:
        model = Wedstrijd
        fields = ['id', 'team1', 'team2', 'puntenTeam1', 'puntenTeam2']
