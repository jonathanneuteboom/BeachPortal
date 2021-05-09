import { StandItem } from './StandItem';
import { Wedstrijd } from './Wedstrijd';

export class Poule {
  id: number;
  naam: string;
  speeltijd: Date;
  stand: StandItem[];  
  wedstrijden: Wedstrijd[]

  constructor(
    id: number,
    naam: string,
    speeltijd: Date,
    stand: StandItem[],
    wedstrijden: Wedstrijd[]) {
    this.id = id;
    this.naam = naam;
    this.speeltijd = speeltijd;
    this.stand = stand;
    this.wedstrijden = wedstrijden;
  }
}