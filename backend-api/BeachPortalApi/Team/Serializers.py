
from rest_framework import serializers
from BeachPortalApi.Speler.Serializers import UserSerializer

from BeachPortalApi.Team.models import Team


class TeamSerializer(serializers.ModelSerializer):
    spelers = UserSerializer(many=True)
    categorieValue = serializers.CharField(source='get_categorie_display')

    class Meta:
        model = Team
        fields = ['id', 'naam', 'spelers', 'categorie', 'categorieValue']
