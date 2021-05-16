import { Categorie } from './Categorie';
import { Speler } from './Speler';

export class Team {
  public id: number;
  public naam: string;
  public categorie: Categorie;
  public spelers: Speler[] = [];
  public categorieValue: string;

  public constructor(init?: Partial<Team>) {
    Object.assign(this, init);
  }
}
