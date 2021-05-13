import { Team } from '../models/Team';

export class Wedstrijd {
  constructor(
    public id: number,
    public team1: Team,
    public team2: Team,
    public puntenTeam1: number = null,
    public puntenTeam2: number = null
  ) {}
}
