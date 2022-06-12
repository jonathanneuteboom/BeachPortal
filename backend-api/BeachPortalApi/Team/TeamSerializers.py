from BeachPortalApi.Speler.SpelerSerializers import UserSerializer
from BeachPortalApi.Team.Team import Team
from rest_framework import serializers


class TeamSerializer(serializers.ModelSerializer):
    spelers = serializers.SerializerMethodField()
    categorieValue = serializers.CharField(source="get_categorie_display")

    def get_spelers(self, instance):
        spelers = instance.spelers
        return UserSerializer(spelers, many=True).data

    class Meta:
        model = Team
        fields = ["id", "naam", "spelers", "categorie", "categorieValue"]
