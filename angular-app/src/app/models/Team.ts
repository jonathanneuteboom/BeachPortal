import { Speler } from './Speler';

export class Team {
  constructor(
    public id: number,
    public naam: string,
    public spelers: Speler[]
  ) {}
}
