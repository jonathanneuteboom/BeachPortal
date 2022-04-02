from django.contrib.auth import get_user_model
from django.db import models


class Speelronde(models.Model):
    nummer = models.PositiveSmallIntegerField()

    def __str__(self):
        return f'{self.nummer}'
