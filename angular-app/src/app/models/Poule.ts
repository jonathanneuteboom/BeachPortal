import { StandItem } from './StandItem';
import { Team } from './Team';
import { Wedstrijd } from './Wedstrijd';

export enum Categorie{
  Heren,
  Dames,
  Mix
}

export class Poule {
  id: number;
  naam: string;
  categorie: Categorie;
  speeltijd: Date;
  stand: StandItem[];
  wedstrijden: Wedstrijd[];
  teams: Team[];

  constructor(
    id: number,
    naam: string,
    categorie: Categorie,
    speeltijd: Date,
    stand: StandItem[],
    wedstrijden: Wedstrijd[],
    teams: Team[]
  ) {
    this.id = id;
    this.naam = naam;
    this.categorie = categorie;
    this.speeltijd = speeltijd;
    this.stand = stand;
    this.wedstrijden = wedstrijden;
    this.teams = teams;
  }
}
