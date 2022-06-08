import { Team } from '../Components/Poule/Team'
import { AlgemeenKlassementItemResponse } from '../Responses'

export class AlgemeenKlassementItem {
  static fromApi(response: AlgemeenKlassementItemResponse) {
    const team = Team.fromApi(response.team)
    return new AlgemeenKlassementItem(team, response.totaal, response.punten)
  }

  constructor(
    public team: Team,
    public totaal: number,
    public punten: number[],
  ) {}
}
