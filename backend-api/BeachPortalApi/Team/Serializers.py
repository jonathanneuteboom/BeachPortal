from BeachPortalApi.Speler.Serializers import UserSerializer
from BeachPortalApi.Team.models import Team
from rest_framework import serializers


class TeamSerializer(serializers.ModelSerializer):
    spelers = UserSerializer(many=True)
    categorieValue = serializers.CharField(source='get_categorie_display')

    class Meta:
        model = Team
        fields = ['id', 'naam', 'spelers', 'categorie', 'categorieValue']
