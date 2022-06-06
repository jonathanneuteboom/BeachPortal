
from __future__ import annotations

from typing import Any, Optional

from django.db import models
from django.db.models import QuerySet
from django.db.models.manager import BaseManager


class Speelronde(models.Model):
    nummer = models.PositiveSmallIntegerField()
    poules: BaseManager

    @staticmethod
    def getCurrentSpeelronde() -> 'Optional[Speelronde]':
        return Speelronde.objects.order_by('-nummer').prefetch_related('poules').first()

    @staticmethod
    def getAllSpeelrondes() -> QuerySet[Speelronde]:
        return Speelronde.objects.prefetch_related('poules').order_by('nummer').all()

    def getPoulesByCategorie(self, categorie) -> QuerySet[Any]:
        return self.poules.filter(categorie=categorie)

    def GetLaagstePoule(self, categorie):
        return self.poules.filter(categorie=categorie).order_by('-nummer').first()

    def __str__(self):
        return f'{self.nummer}'
