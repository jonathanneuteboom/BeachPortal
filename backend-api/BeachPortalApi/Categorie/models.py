
from django.db import models
from django.utils.translation import gettext_lazy as _


class Categorie(models.TextChoices):
    VROUWEN = 'V', _('Vrouwen')
    MANNEN = 'M', _('Mannen')
    MIX = 'X', _('Mix')
