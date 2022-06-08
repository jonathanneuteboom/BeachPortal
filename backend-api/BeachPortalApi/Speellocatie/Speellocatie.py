from django.db import models


class Speellocatie(models.Model):
    naam = models.TextField()

    def __str__(self):
        return self.naam
