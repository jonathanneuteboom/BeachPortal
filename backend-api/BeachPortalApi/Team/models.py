from BeachPortalApi.Categorie.models import Categorie
from BeachPortalApi.Email.Email import Email
from BeachPortalApi.Email.GetPlaceholderValue import IGetPlaceholderValue
from BeachPortalApi.Speler.Speler import Speler
from django.db import models


class Team(models.Model, IGetPlaceholderValue):
    categorie = models.CharField(max_length=1, choices=Categorie.choices)
    naam = models.CharField(max_length=255)
    spelers = models.ManyToManyField(Speler)

    def generateEmails(self, title, message):
        sender = Speler.objects.get(username="EmailUser")
        emails = []
        for speler in self.spelers.all():
            newEmail = Email.generate(
                sender, speler, title, message, [self, speler]
            )
            emails.append(newEmail)

        return emails

    def getPlaceholderValue(self, placeholder):
        if placeholder == "{{TEAMS}}":
            spelers = list(map(
                lambda speler: f'{speler.first_name} {speler.last_name}', self.spelers.all()))
            return f'{self.naam} ({", ".join(spelers)})'

        return None

    def __str__(self):
        return self.naam
