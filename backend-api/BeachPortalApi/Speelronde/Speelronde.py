from __future__ import annotations

from typing import Any, Optional

from django.db import models
from django.db.models import QuerySet
from django.db.models.manager import BaseManager


class Speelronde(models.Model):
    nummer = models.PositiveSmallIntegerField()
    poules: BaseManager

    @staticmethod
    def getCurrentSpeelronde() -> "Optional[Speelronde]":
        return (
            Speelronde.objects.all()
            .prefetch_related("poules")
            .order_by("-nummer")
            .first()
        )

    @staticmethod
    def getAllSpeelrondes() -> QuerySet[Speelronde]:
        return Speelronde.objects.prefetch_related("poules").order_by("nummer")

    def getPoulesByCategorie(self, categorie) -> QuerySet[Any]:
        return self.poules.prefetch_related("teams", "wedstrijden").filter(
            categorie=categorie
        )

    def GetLaagstePoule(self, categorie):
        return self.poules.filter(categorie=categorie).order_by("-nummer").first()

    def __str__(self):
        return f"{self.nummer}"
