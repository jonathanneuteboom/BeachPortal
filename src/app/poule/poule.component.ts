import { Categorie, Poule } from '../models/Poule';
import { Component, Input, OnInit } from '@angular/core';

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
