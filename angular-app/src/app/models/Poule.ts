
import { Categorie } from './Categorie';
import { Speellocatie } from './Speellocatie';
import { StandItem } from './StandItem';
import { Team } from './Team';
import { Wedstrijd } from './Wedstrijd';

export class Poule {
  public id: number;
  public naam: string;
  public categorie: Categorie;
  public speeltijd: string;
  public stand: StandItem[];
  public wedstrijden: Wedstrijd[];
  public teams: Team[];
  public speellocatie: Speellocatie;

  public constructor(init?: Partial<Poule>) {
    Object.assign(this, init);
  }
}
