from BeachPortalApi.Poule.Poule import Poule
from BeachPortalApi.Speellocatie.SpeellocatieSerializer import SpeellocatieSerializer
from BeachPortalApi.Stand.StandItem import StandItem
from BeachPortalApi.Stand.StandItemSerializer import StandItemSerializer
from BeachPortalApi.Team.TeamSerializers import TeamSerializer
from BeachPortalApi.Wedstrijd.WedstrijdSerializers import WedstrijdSerializer
from rest_framework import serializers


class PouleSerializer(serializers.ModelSerializer):
    teams = serializers.SerializerMethodField()
    wedstrijden = serializers.SerializerMethodField()
    stand = serializers.SerializerMethodField()
    categorieValue = serializers.CharField(source="get_categorie_display")
    speellocatie = SpeellocatieSerializer()

    asd = None

    class Meta:
        model = Poule
        fields = (
            "id",
            "nummer",
            "categorie",
            "speeltijd",
            "teams",
            "speellocatie",
            "categorieValue",
            "wedstrijden",
            "stand",
        )

    def get_wedstrijden(self, instance):
        wedstrijden = instance.wedstrijden.select_related("team1", "team2").all()
        return WedstrijdSerializer(wedstrijden, many=True).data

    def get_teams(self, instance):
        teams = instance.teams.prefetch_related("spelers").all()
        serializer = TeamSerializer(teams, many=True)
        return serializer.data

    def get_stand(self, instance):
        stand = []

        for team in instance.teams.all():
            stand.append(StandItem(team))

        for wedstrijd in instance.wedstrijden.all():
            i = next(
                i
                for i, standItem in enumerate(stand)
                if standItem.team.id == wedstrijd.team1_id
            )
            stand[i].addPunten(wedstrijd.puntenTeam1, wedstrijd.puntenTeam2)

            i = next(
                i
                for i, standItem in enumerate(stand)
                if standItem.team.id == wedstrijd.team2_id
            )
            stand[i].addPunten(wedstrijd.puntenTeam2, wedstrijd.puntenTeam1)

        stand.sort()

        serializer = StandItemSerializer(stand, many=True)
        return serializer.data
