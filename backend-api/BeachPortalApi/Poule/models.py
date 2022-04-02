from cProfile import label
from django.db import models

from BeachPortalApi.Categorie.models import Categorie
from BeachPortalApi.Speelronde.models import Speelronde
from BeachPortalApi.Team.models import Team


class Poule(models.Model):
    speelronde = models.ForeignKey(Speelronde, on_delete=models.CASCADE)
    categorie = models.CharField(max_length=1, choices=Categorie.choices)
    naam = models.CharField(max_length=255)
    speeltijd = models.DateTimeField()
    teams = models.ManyToManyField(Team)

    def __str__(self):
        return f'Ronde {self.speelronde.nummer}, {self.naam} ({Categorie(self.categorie).label})'
