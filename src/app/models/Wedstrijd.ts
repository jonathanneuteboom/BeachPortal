import { Team } from '../models/Team';

export class Wedstrijd {
  id: number;
  team1: Team;
  team2: Team;
  puntenTeam1: number;
  puntenTeam2: number;

  constructor(
    id: number,
    team1: Team,
    team2: Team,
    puntenTeam1: number = 0,
    puntenTeam2: number = 0) {
    this.id = id;
    this.team1 = team1;
    this.team2 = team2;
    this.puntenTeam1 = puntenTeam1;
    this.puntenTeam2 = puntenTeam2;
  }
}
