import { Speler } from '../../Login/Models/Person'
import { TeamResponse } from '../../Responses'

export class Team {
  static fromApi(response: TeamResponse) {
    const team = new Team(response.id, response.naam)
    team.spelers = response.spelers.map(Speler.fromApi)

    return team
  }

  public spelers: Speler[] = []

  constructor(public id: number, public name: string) {}
}
