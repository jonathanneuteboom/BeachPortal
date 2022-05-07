import { Team } from './Team'

export class Match {
  constructor(
    public id: number,
    public team1: Team,
    public team2: Team,
    public scoreTeam1: number,
    public scoreTeam2: number
  ) {}
}
