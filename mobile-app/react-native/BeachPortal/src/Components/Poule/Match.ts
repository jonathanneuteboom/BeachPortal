import { WedstrijdResponse } from '../../Responses'
import { Team } from './Team'

export class Wedstrijd {
  static fromApi(response: WedstrijdResponse): Wedstrijd {
    return new Wedstrijd(
      response.id,
      response.team1,
      response.team2,
      response.puntenTeam1,
      response.puntenTeam2,
    )
  }

  constructor(
    public id: number,
    public team1: string,
    public team2: string,
    public puntenTeam1: number,
    public puntenTeam2: number,
  ) {}
}
