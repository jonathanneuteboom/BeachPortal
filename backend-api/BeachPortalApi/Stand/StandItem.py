from BeachPortalApi.Team.Team import Team


class StandItem():
    team: Team
    puntenVoor = 0
    puntenTegen = 0
    quotient = 0
    gewonnenWedstrijden = 0

    def __lt__(self, other):
        if self.gewonnenWedstrijden != other.gewonnenWedstrijden:
            return self.gewonnenWedstrijden > other.gewonnenWedstrijden

        return self.quotient > other.quotient

    def __init__(self, team):
        self.team = team

    def addPunten(self, puntenVoor, puntenTegen):
        self.puntenVoor += puntenVoor
        self.puntenTegen += puntenTegen

        if self.puntenTegen > 0:
            self.quotient = self.puntenVoor/self.puntenTegen

        if puntenVoor > puntenTegen:
            self.gewonnenWedstrijden += 1
