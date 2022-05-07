import { Team } from './Team'

export class RankingItem {
  constructor(
    public team: Team,
    public wins: number,
    public winPoints: number,
    public losePoints: number,
    public coefficient: number
  ) {}
}
