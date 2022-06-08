import { SpeellocatieResponse } from '../../Responses'

class Speellocatie {
  static fromApi(locatie: SpeellocatieResponse) {
    return new Speellocatie(locatie.id, locatie.naam)
  }

  constructor(public id: number, public naam: string) {}
}

export default Speellocatie
