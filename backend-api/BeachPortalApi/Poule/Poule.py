from __future__ import annotations

from BeachPortalApi.Categorie.models import Categorie
from BeachPortalApi.Email.Email import Email
from BeachPortalApi.Email.GetPlaceholderValue import IGetPlaceholderValue
from BeachPortalApi.Speellocatie.Speellocatie import Speellocatie
from BeachPortalApi.Speelronde.Speelronde import Speelronde
from BeachPortalApi.Speler.Speler import Speler
from BeachPortalApi.Stand.StandItem import StandItem
from BeachPortalApi.Team.Team import Team
from django.db import models
from django.db.models.manager import BaseManager


class Poule(models.Model, IGetPlaceholderValue):
    wedstrijden: BaseManager
    speelronde = models.ForeignKey(
        Speelronde, on_delete=models.CASCADE, related_name="poules"
    )
    categorie = models.CharField(max_length=1, choices=Categorie.choices)
    nummer = models.IntegerField()
    speeltijd = models.DateTimeField()
    teams = models.ManyToManyField(Team, blank=True)
    speellocatie = models.ForeignKey(
        Speellocatie, on_delete=models.RESTRICT, related_name="speellocaties"
    )

    def getStand(self):
        stand = []

        teams = self.teams.all()
        if teams.count() == 0:
            return stand

        for team in teams:
            stand.append(StandItem(team))

        for wedstrijd in self.wedstrijden.all():
            i = next(
                i
                for i, standItem in enumerate(stand)
                if standItem.team.id == wedstrijd.team1_id
            )
            stand[i].addPunten(wedstrijd.puntenTeam1, wedstrijd.puntenTeam2)

            i = next(
                i
                for i, standItem in enumerate(stand)
                if standItem.team.id == wedstrijd.team2_id
            )
            stand[i].addPunten(wedstrijd.puntenTeam2, wedstrijd.puntenTeam1)

        stand.sort()

        return stand

    def getPlaceholderValue(self, placeholder):
        if placeholder == "POULE":
            return f"{Categorie(self.categorie).label} {self.nummer}"
        if placeholder == "SPEELTIJD":
            return self.speeltijd
        if placeholder == "LOCATIE":
            return self.speellocatie.naam
        if placeholder == "TEAMS":
            teams = list(
                map(lambda team: team.getPlaceholderValue("TEAM"), self.teams.all())
            )
            return "\n".join(teams)
        if placeholder == "SPEELRONDE":
            return f"{self.speelronde.nummer}"

        return None

    def generateEmails(self, title: str, message: str) -> list:
        sender = Speler.objects.get(username="EmailUser")
        emails = []
        for team in self.teams.all():
            for speler in team.spelers.all():
                newEmail = Email.generate(
                    sender, speler, title, message, [self, speler]
                )
                emails.append(newEmail)

        return emails

    def __str__(self):
        return f"Ronde {1111}, Poule {self.nummer} ({Categorie(self.categorie).label})"
