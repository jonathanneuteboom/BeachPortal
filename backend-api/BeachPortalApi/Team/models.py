from django.db import models
from django.contrib.auth import get_user_model
from BeachPortalApi.Categorie.models import Categorie

User = get_user_model()


class Team(models.Model):
    categorie = models.CharField(max_length=1, choices=Categorie.choices)
    naam = naam = models.CharField(max_length=255)
    spelers = models.ManyToManyField(User)

    def __str__(self):
        return self.naam
