import { Component, OnInit } from '@angular/core';

import { Categorie } from '../models/Categorie';
import { FormControl } from '@angular/forms';
import { Poule } from '../models/Poule';
import { Speelronde } from '../models/Speelronde';
import { Speler } from '../models/Speler';
import { StandItem } from '../models/StandItem';
import { Team } from '../models/Team';
import { Wedstrijd } from '../models/Wedstrijd';

@Component({
  selector: 'app-speelrondes',
  templateUrl: './speelrondes.component.html',
  styleUrls: ['./speelrondes.component.scss']
})
export class SpeelrondesComponent implements OnInit {
  type = 'heren';
  nummer = '0';
  typeControl = new FormControl();
  speelrondeControl = new FormControl();

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

  speelrondes: Speelronde[] = [
    new Speelronde({
      nummer: 1,
      poules: [
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
      ]
    }),
    new Speelronde({
      nummer: 2,
      poules: [
        new Poule({
          naam: 'C',
          categorie: Categorie.Heren,
          speeltijd: new Date(),
          teams: this.teams
        }),
        new Poule({
          naam: 'D',
          categorie: Categorie.Heren,
          speeltijd: new Date(),
          teams: this.teams
        })
      ]
    })
  ];

  constructor() {}

  ngOnInit(): void {}
}
