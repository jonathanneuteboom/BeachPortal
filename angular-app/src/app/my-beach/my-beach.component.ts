import { Component, OnInit } from '@angular/core';

import { Categorie } from '../models/Categorie';
import { Poule } from '../models/Poule';
import { Speler } from '../models/Speler';
import { StandItem } from '../models/StandItem';
import { Team } from '../models/Team';
import { Wedstrijd } from '../models/Wedstrijd';

@Component({
  selector: 'app-my-beach',
  templateUrl: './my-beach.component.html',
  styleUrls: ['./my-beach.component.scss']
})
export class MyBeachComponent implements OnInit {
  teams: Team[] = [
    new Team({
      naam: 'Binkies Alfa',
      categorie: Categorie.Heren,
      spelers: [
        new Speler({ naam: 'Jonathan Neuteboom' }),
        new Speler({ naam: 'Sjoerd Verbeek' })
      ]
    }),
    new Team({
      naam: 'Binkies Beta',
      categorie: Categorie.Dames,
      spelers: [
        new Speler({ naam: 'Niels Barelds' }),
        new Speler({ naam: 'Coen Versluijs' })
      ]
    }),
    new Team({
      naam: 'Binkies Gamma',
      categorie: Categorie.Mix,
      spelers: [
        new Speler({ naam: 'Jurian Meijerhof' }),
        new Speler({ naam: 'Friso van Bokhorst' })
      ]
    }),
    new Team({
      naam: 'Binkies Delta',
      categorie: Categorie.Heren,
      spelers: [
        new Speler({ naam: 'Huub Adriaanse' }),
        new Speler({ naam: 'Joris Heinsbroek' })
      ]
    })
  ];

  stand = [
    new StandItem({
      team: this.teams[0],
      gewonnenWedstrijden: 3,
      puntenVoor: 20,
      puntenTegen: 10,
      puntenquotient: 0.534
    }),
    new StandItem({
      team: this.teams[1],
      gewonnenWedstrijden: 2,
      puntenVoor: 19,
      puntenTegen: 11,
      puntenquotient: 0.782
    }),
    new StandItem({
      team: this.teams[2],
      gewonnenWedstrijden: 1,
      puntenVoor: 18,
      puntenTegen: 12,
      puntenquotient: 0.3
    }),
    new StandItem({
      team: this.teams[3],
      gewonnenWedstrijden: 0,
      puntenVoor: 17,
      puntenTegen: 13,
      puntenquotient: 0.237
    })
  ];

  wedstrijden: Wedstrijd[] = [
    new Wedstrijd({
      team1: this.teams[0],
      team2: this.teams[1],
      puntenTeam1: 21,
      puntenTeam2: 19
    }),
    new Wedstrijd({ team1: this.teams[2], team2: this.teams[3] }),
    new Wedstrijd({
      team1: this.teams[0],
      team2: this.teams[2],
      puntenTeam1: 21,
      puntenTeam2: 1
    }),
    new Wedstrijd({ team1: this.teams[1], team2: this.teams[3] }),
    new Wedstrijd({ team1: this.teams[0], team2: this.teams[3] }),
    new Wedstrijd({ team1: this.teams[1], team2: this.teams[2] })
  ];

  poules: Poule[] = [
    new Poule({
      naam: 'A',
      categorie: Categorie.Heren,
      speeltijd: new Date(),
      teams: this.teams
    }),
    new Poule({
      naam: 'B',
      categorie: Categorie.Heren,
      speeltijd: new Date(),
      teams: this.teams
    })
  ];

  constructor() {}

  ngOnInit(): void {}
}
