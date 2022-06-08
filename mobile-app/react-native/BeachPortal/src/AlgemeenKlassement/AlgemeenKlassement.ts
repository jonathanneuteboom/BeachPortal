import { AlgemeenKlassementListResponse } from '../Responses'
import { AlgemeenKlassementItem } from './AlgemeenKlassementItem'

class AlgemeenKlassement {
  dames: AlgemeenKlassementItem[] = []
  heren: AlgemeenKlassementItem[] = []
  mix: AlgemeenKlassementItem[] = []

  static fromApi(response: AlgemeenKlassementListResponse): AlgemeenKlassement {
    const algemeenKlassement = new AlgemeenKlassement()
    algemeenKlassement.dames = response
      .find(klassement => klassement.categorie === 'Dames')!
      .ranking.map(rank => AlgemeenKlassementItem.fromApi(rank))

    algemeenKlassement.heren = response
      .find(klassement => klassement.categorie === 'Heren')!
      .ranking.map(rank => AlgemeenKlassementItem.fromApi(rank))

    algemeenKlassement.mix = response
      .find(klassement => klassement.categorie === 'Mix')!
      .ranking.map(rank => AlgemeenKlassementItem.fromApi(rank))

    return algemeenKlassement
  }
}

export default AlgemeenKlassement
