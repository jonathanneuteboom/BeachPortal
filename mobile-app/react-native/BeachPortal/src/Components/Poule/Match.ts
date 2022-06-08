import { WedstrijdResponse } from '../../Responses'
import { Team } from './Team'

export class Wedstrijd {
  static fromApi(response: WedstrijdResponse): Wedstrijd {
    const team1 = Team.fromApi(response.team1)
    const team2 = Team.fromApi(response.team2)

    return new Wedstrijd(
      response.id,
      team1,
      team2,
      response.puntenTeam1,
      response.puntenTeam2,
    )
  }

  constructor(
    public id: number,
    public team1: Team,
    public team2: Team,
    public puntenTeam1: number,
    public puntenTeam2: number,
  ) {}
}
