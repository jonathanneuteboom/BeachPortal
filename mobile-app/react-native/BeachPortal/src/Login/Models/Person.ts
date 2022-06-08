import { SpelerResponse } from '../../Responses'

export class Speler {
  static fromApi(response: SpelerResponse) {
    return new Speler(response.id, response.naam)
  }

  constructor(public id: number, public username: string) {}
}
