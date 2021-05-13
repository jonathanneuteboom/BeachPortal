import { Component, OnInit } from '@angular/core';

import { Categorie } from "../models/Categorie";
import { Poule } from '../models/Poule';
import { Speler } from '../models/Speler';
import { Team } from '../models/Team';
import { _MatTabBodyBase } from '@angular/material/tabs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  teams: Team[] = [
    new Team(1, 'Binkies Alfa', [
      new Speler(1, 'Jonathan Neuteboom'),
      new Speler(2, 'Sjoerd Verbeek'),
    ]),
    new Team(2, 'Binkies Beta', [
      new Speler(3, 'Niels Barelds'),
      new Speler(4, 'Coen Versluijs'),
    ]),
    new Team(3, 'Binkies Gamma', [
      new Speler(5, 'Jurian Meijerhof'),
      new Speler(6, 'Friso van Bokhorst'),
    ]),
    new Team(4, 'Binkies Delta', [
      new Speler(7, 'Huub Adriaanse'),
      new Speler(8, 'Joris Heinsbroek'),
    ]),
  ];

  today = new Date('2021-05-14');
  tomorrow = new Date('2021-05-15');  

  dagen: Speeldag[] = [
    new Speeldag(this.today, [
      new Poule(1, 'A', Categorie.Heren, new Date(), null, null, this.teams),
      new Poule(1, 'B', Categorie.Dames, new Date(), null, null, this.teams),
      new Poule(1, 'C', Categorie.Mix, new Date(), null, null, this.teams),
      new Poule(1, 'D', Categorie.Heren, new Date(), null, null, this.teams),
      new Poule(1, 'E', Categorie.Dames, new Date(), null, null, this.teams),
      new Poule(1, 'F', Categorie.Mix, new Date(), null, null, this.teams),
      new Poule(1, 'G', Categorie.Heren, new Date(), null, null, this.teams),
      new Poule(1, 'H', Categorie.Dames, new Date(), null, null, this.teams),
    ]),
    new Speeldag(this.tomorrow, [
      new Poule(1, 'A', Categorie.Heren, new Date(), null, null, this.teams),
      new Poule(1, 'B', Categorie.Dames, new Date(), null, null, this.teams),
      new Poule(1, 'C', Categorie.Mix, new Date(), null, null, this.teams),
      new Poule(1, 'D', Categorie.Heren, new Date(), null, null, this.teams),
      new Poule(1, 'E', Categorie.Dames, new Date(), null, null, this.teams),
      new Poule(1, 'F', Categorie.Mix, new Date(), null, null, this.teams),
      new Poule(1, 'G', Categorie.Heren, new Date(), null, null, this.teams),
      new Poule(1, 'H', Categorie.Dames, new Date(), null, null, this.teams),
    ]),
  ];
  constructor() {}

  ngOnInit(): void {}
}

export class Speeldag {
  dag: Date;
  poules: Poule[];

  constructor(dag: Date, poules: Poule[]) {
    this.dag = dag;
    this.poules = poules;
  }
}
