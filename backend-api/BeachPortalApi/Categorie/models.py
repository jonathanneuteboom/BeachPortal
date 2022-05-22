
from django.db import models
from django.utils.translation import gettext_lazy as _


class Categorie(models.TextChoices):
    DAMES = 'D', _('Dames')
    HEREN = 'H', _('Heren')
    MIX = 'X', _('Mix')

    def getByDisplayName(name):
        if name == 'Dames':
            return Categorie.DAMES
        if name == 'Heren':
            return Categorie.HEREN
        if name == 'Mix':
            return Categorie.MIX
