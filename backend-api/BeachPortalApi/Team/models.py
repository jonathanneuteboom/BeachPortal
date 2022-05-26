from BeachPortalApi.Categorie.models import Categorie
from BeachPortalApi.Speler.Speler import Speler
from django.db import models


class Team(models.Model):
    categorie = models.CharField(max_length=1, choices=Categorie.choices)
    naam = models.CharField(max_length=255)
    spelers = models.ManyToManyField(Speler)

    def __str__(self):
        return self.naam
