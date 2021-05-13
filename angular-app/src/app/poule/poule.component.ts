import { Component, Input, OnInit } from '@angular/core';

import { Categorie } from "../models/Categorie";
import { Poule } from '../models/Poule';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss'],
})
export class PouleComponent implements OnInit {
  @Input() poule: Poule;

  heren = Categorie.Heren;
  dames = Categorie.Dames;
  mix = Categorie.Mix;

  constructor() {}

  getCategorie(categorie: Categorie): string {
    return Categorie[categorie];
  }

  ngOnInit(): void {}
}
