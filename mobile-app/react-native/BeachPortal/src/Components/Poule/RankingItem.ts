import { StandResponse } from '../../Responses'
import { Team } from './Team'

export class StandItem {
  static fromApi(response: StandResponse): StandItem {
    const team = Team.fromApi(response.team)

    return new StandItem(
      team,
      response.gewonnenWedstrijden,
      response.puntenVoor,
      response.puntenTegen,
      response.quotient,
    )
  }

  constructor(
    public team: Team,
    public gewonnenWedstrijden: number,
    public puntenVoor: number,
    public puntenTegen: number,
    public quotient: number,
  ) {}
}
