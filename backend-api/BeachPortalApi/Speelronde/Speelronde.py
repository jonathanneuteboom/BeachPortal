
from typing import Optional

from django.db import models
from django.db.models.manager import BaseManager


class Speelronde(models.Model):
    nummer = models.PositiveSmallIntegerField()
    poules: BaseManager

    @staticmethod
    def getCurrentSpeelronde() -> 'Optional[Speelronde]':
        return Speelronde.objects.order_by(
            '-nummer'
        ).prefetch_related('poules').first()

    def GetLaagstePoule(self, categorie):
        return self.poules.filter(
            categorie=categorie
        ).order_by('-nummer').first()

    def __str__(self):
        return f'{self.nummer}'
