
from django.db import models
from django.utils.translation import gettext_lazy as _


class Categorie(models.TextChoices):
    DAMES = 'D', _('Dames')
    HEREN = 'H', _('Heren')
    MIX = 'X', _('Mix')
