import { Component, OnInit } from '@angular/core';
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


  myTeams = [
    <Team>{
      spelers: [
        {
          naam: "Jonathan Neuteboom",
          id: 1
        },
        {
          naam: "Sjoerd Verbeek",
          id: 2
        },
      ],
      naam: "STXD"
    }
  ];

  teams: Team[] = [
    new Team("Binkies Alfa", [new Speler(1, "Jonathan Neuteboom"), new Speler(2, "Sjoerd Verbeek")]),
    new Team("Binkies Beta", [new Speler(3, "Niels Barelds"), new Speler(4, "Coen Versluijs")]),
    new Team("Binkies Gamma", [new Speler(5, "Jurian Meijerhof"), new Speler(6, "Friso van Bokhorst")]),
    new Team("Binkies Delta", [new Speler(7, "Huub Adriaanse"), new Speler(8, "Joris Heinsbroek")]),
  ];

  stand: StandItem[] = [
    new StandItem(this.teams[0], 3, 20, 10, 0.534),
    new StandItem(this.teams[1], 2, 19, 11, 0.782),
    new StandItem(this.teams[2], 1, 18, 12, 0.3),
    new StandItem(this.teams[3], 0, 17, 13, 0.237),
  ];

  wedstrijden: Wedstrijd[] = [
    new Wedstrijd(1, this.teams[0], this.teams[1], 21, 19),
    new Wedstrijd(2, this.teams[2], this.teams[3]),
    new Wedstrijd(3, this.teams[0], this.teams[2], 21, 1),
    new Wedstrijd(4, this.teams[1], this.teams[3]),
    new Wedstrijd(5, this.teams[0], this.teams[3]),
    new Wedstrijd(6, this.teams[1], this.teams[2])
  ];

  poules = [
    new Poule(1, "A", new Date(), this.stand, this.wedstrijden),
    new Poule(1, "D", new Date(), this.stand, this.wedstrijden)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

