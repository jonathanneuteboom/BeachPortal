import { Team } from '../models/Team';

export class Wedstrijd {
  public id: number;
  public team1: Team;
  public team2: Team;
  public puntenTeam1: number = null;
  public puntenTeam2: number = null;

  public constructor(init?: Partial<Wedstrijd>) {
    Object.assign(this, init);
  }
}
