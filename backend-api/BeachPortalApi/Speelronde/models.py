from django.db import models


class Speelronde(models.Model):
    nummer = models.PositiveSmallIntegerField()

    @staticmethod
    def getCurrentSpeelronde():
        try:
            return Speelronde.objects.order_by(
                '-nummer'
            ).prefetch_related('poules').first()
        except:
            return None

    def __str__(self):
        return f'{self.nummer}'
