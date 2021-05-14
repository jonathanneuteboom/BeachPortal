import { Poule } from '../models/Poule';

export class Speelronde {
  public nummer: number;
  public poules: Poule[];

  public constructor(init?: Partial<Speelronde>) {
    Object.assign(this, init);
  }
}
