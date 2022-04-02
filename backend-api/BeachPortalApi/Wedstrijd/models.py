from django.db import models

from BeachPortalApi.Poule.models import Poule
from BeachPortalApi.Team.models import Team


class Wedstrijd(models.Model):
    poule = models.ForeignKey(Poule, on_delete=models.CASCADE)
    team1 = models.ForeignKey(
        Team, related_name="team1", on_delete=models.CASCADE)
    team2 = models.ForeignKey(
        Team,  related_name="team2", on_delete=models.CASCADE)
    puntenTeam1 = models.PositiveSmallIntegerField()
    puntenTeam2 = models.PositiveSmallIntegerField()

    class Meta:
        verbose_name_plural = 'Wedstrijden'

    def __str__(self):
        return f'{self.poule}: {self.team1.naam} - {self.team2.naam}'
