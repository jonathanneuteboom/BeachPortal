import { Categorie } from './Categorie';
import { StandItem } from './StandItem';
import { Team } from './Team';
import { Wedstrijd } from './Wedstrijd';

export class Poule {
  constructor(
    public id: number,
    public naam: string,
    public categorie: Categorie,
    public speeltijd: Date,
    public stand: StandItem[],
    public wedstrijden: Wedstrijd[],
    public teams: Team[]
  ) {}
}
