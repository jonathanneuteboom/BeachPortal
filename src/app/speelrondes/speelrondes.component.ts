import { Categorie, Poule } from '../models/Poule';
import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
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
    new Team("Binkies Alfa", [new Speler(1, "Jonathan Neuteboom"), new Speler(2, "Sjoerd Verbeek")]),
    new Team("Binkies Beta", [new Speler(3, "Niels Barelds"), new Speler(4, "Coen Versluijs")]),
    new Team("Binkies Gamma", [new Speler(5, "Jurian Meijerhof"), new Speler(6, "Friso van Bokhorst")]),
    new Team("Binkies Delta", [new Speler(7, "Huub Adriaanse"), new Speler(8, "Joris Heinsbroek")]),
  ];

  wedstrijden: Wedstrijd[] = [
    new Wedstrijd(1, this.teams[0], this.teams[1], 21, 19),
    new Wedstrijd(2, this.teams[2], this.teams[3]),
    new Wedstrijd(3, this.teams[0], this.teams[2], 21, 1),
    new Wedstrijd(4, this.teams[1], this.teams[3]),
    new Wedstrijd(5, this.teams[0], this.teams[3]),
    new Wedstrijd(6, this.teams[1], this.teams[2])
  ];

  stand: StandItem[] = [
    new StandItem(this.teams[0], 3, 20, 10, 0.534),
    new StandItem(this.teams[1], 2, 19, 11, 0.782),
    new StandItem(this.teams[2], 1, 18, 12, 0.3),
    new StandItem(this.teams[3], 0, 17, 13, 0.237),
  ];

  speelrondes: Speelronde[] = [
    new Speelronde(10, 1, [
      new Poule(1, "A", Categorie.Heren, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "B", Categorie.Dames, new Date(), this.stand, this.wedstrijden, []),
    ], [
      new Poule(1, "C", Categorie.Heren, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "D", Categorie.Dames, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "E", Categorie.Mix, new Date(), this.stand, this.wedstrijden, [])
    ], [
      new Poule(1, "F", Categorie.Heren, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "G", Categorie.Dames, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "H", Categorie.Heren, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "I", Categorie.Dames, new Date(), this.stand, this.wedstrijden, [])
    ]),
    new Speelronde(10, 2, [
      new Poule(1, "J", Categorie.Heren, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "K", Categorie.Dames, new Date(), this.stand, this.wedstrijden, []),
    ], [
      new Poule(1, "L", Categorie.Heren, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "M", Categorie.Dames, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "N", Categorie.Mix, new Date(), this.stand, this.wedstrijden, [])
    ], [
      new Poule(1, "O", Categorie.Heren, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "P", Categorie.Dames, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "Q", Categorie.Heren, new Date(), this.stand, this.wedstrijden, []),
      new Poule(1, "R", Categorie.Dames, new Date(), this.stand, this.wedstrijden, [])
    ])
  ]

  onChange(event) {
    console.log(event);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
