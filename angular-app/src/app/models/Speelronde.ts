import { Poule } from './Poule';

export class Speelronde {
  constructor(
    public id: number,
    public nummer: number,
    public heren: Poule[],
    public dames: Poule[],
    public mix: Poule[]
  ) {}
}
