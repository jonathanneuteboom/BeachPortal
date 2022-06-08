import { PouleResponse } from '../../Responses'
import Categorie from './Categorie'
import { Wedstrijd } from './Match'
import { StandItem } from './RankingItem'
import Speellocatie from './Speellocatie'

class Poule {
  public stand: StandItem[] = []
  public wedstrijden: Wedstrijd[] = []

  static fromApi(response: PouleResponse): Poule {
    const speellocatie = Speellocatie.fromApi(response.speellocatie)
    const categorie = new Categorie(response.categorieValue, response.categorie)

    const poule = new Poule(
      response.id,
      response.nummer,
      speellocatie,
      new Date(response.speeltijd),
      categorie,
    )

    poule.stand = response.stand.map(StandItem.fromApi)
    poule.wedstrijden = response.wedstrijden.map(Wedstrijd.fromApi)

    return poule
  }

  constructor(
    public id: number,
    public nummer: number,
    public speellocatie: Speellocatie,
    public speeltijd: Date,
    public categorie: Categorie,
  ) {}

  getFullName = () => `${this.categorie.naam} ${this.nummer}`
}
export default Poule
