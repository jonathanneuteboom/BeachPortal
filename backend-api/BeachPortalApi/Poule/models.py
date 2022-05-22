from django.db import models

from BeachPortalApi.Categorie.models import Categorie
from BeachPortalApi.Speellocatie.models import Speellocatie
from BeachPortalApi.Speelronde.models import Speelronde
from BeachPortalApi.Stand.StandItem import StandItem
from BeachPortalApi.Team.models import Team


class Poule(models.Model):
    speelronde = models.ForeignKey(
        Speelronde, on_delete=models.CASCADE, related_name='poules')
    categorie = models.CharField(max_length=1, choices=Categorie.choices)
    nummer = models.IntegerField()
    speeltijd = models.DateTimeField()
    teams = models.ManyToManyField(Team, blank=True)
    speellocatie = models.ForeignKey(
        Speellocatie, on_delete=models.RESTRICT, related_name='speellocaties')

    def getStand(self):
        stand = []

        teams = self.teams.all()
        if teams.count() == 0:
            return stand

        for team in teams:
            stand.append(StandItem(team))

        for wedstrijd in self.wedstrijden.all():
            i = next(i for i, standItem in enumerate(stand)
                     if standItem.team.id == wedstrijd.team1_id)
            stand[i].addPunten(wedstrijd.puntenTeam1,
                               wedstrijd.puntenTeam2)

            i = next(i for i, standItem in enumerate(stand)
                     if standItem.team.id == wedstrijd.team2_id)
            stand[i].addPunten(wedstrijd.puntenTeam2,
                               wedstrijd.puntenTeam1)

        stand.sort()

        return stand

    def __str__(self):
        return f'Ronde {self.speelronde.nummer}, Poule {self.nummer} ({Categorie(self.categorie).label})'
