import { SpeelrondeResponse } from '../../Responses'
import Poule from './Poule'

class Speelronde {
  poules: Poule[] = []

  static fromApi(response: SpeelrondeResponse) {
    const speelronde = new Speelronde(response.id, response.nummer)
    speelronde.poules = response.poules.map(Poule.fromApi)
    return speelronde
  }

  constructor(public id: number, number: number) {}
}

export default Speelronde
