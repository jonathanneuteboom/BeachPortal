from django.db import models
from django.contrib.auth import get_user_model
from BeachPortalApi.Categorie.models import Categorie


class Team(models.Model):
    categorie = models.CharField(max_length=1, choices=Categorie.choices)
    naam = models.CharField(max_length=255)
    spelers = models.ManyToManyField(get_user_model())

    def __str__(self):
        return self.naam
