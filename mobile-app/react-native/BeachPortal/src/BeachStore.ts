import AlgemeenKlassement from './AlgemeenKlassement/AlgemeenKlassement'
import AppError from './AppError'
import BeachAgent from './BeachAgent'
import Cache from './Cache'
import Poule from './Components/Poule/Poule'
import Speelronde from './Components/Poule/Speelronde'
import User from './Login/Models/User'
import apiService from './ApiService'
import { AxiosError } from 'axios'
import { Wedstrijd } from './Components/Poule/Match'
import { action, makeObservable, observable } from 'mobx'

class BeachStore {
  user: User | null = null
  cache: Cache = new Cache()
  favo = false
  myPoules = observable.array<Poule>([])
  allSpeelrondes = observable.array<Speelronde>([])
  algemeenKlassement: AlgemeenKlassement | null = null

  constructor() {
    console.log('BeachStore.tsx')
    makeObservable(this, {
      myPoules: observable,
      setMyPoules: action,
      allSpeelrondes: observable,
      setAllSpeelrondes: action,
      user: observable,
      setUser: action,
      algemeenKlassement: observable,
      setAlgemeenKlassement: action,
    })

    this.cache.user.getEntity().then(user => {
      if (!user) {
        return
      }
      this.setUser(user)
      apiService.setAuthenticationToken(user.token)
      this.getMyPoules()
    })
  }

  setUser(user: User | null) {
    this.user = user
    if (user) {
      this.cache.user.setEntity(user)
    } else {
      this.cache.user.deleteEntity()
    }
  }

  getMyPoules = () => {
    BeachAgent.myPoules()
      .then(poules => {
        const newPoules = poules.map(Poule.fromApi)
        this.setMyPoules(newPoules)
      })
      .catch(() => {})
  }

  getAllSpeelronde = () => {
    BeachAgent.allSpeelrondes().then(speelronde => {
      const allSpeelrondes = speelronde.map(Speelronde.fromApi)
      this.setAllSpeelrondes(allSpeelrondes)
    })
  }

  setMyPoules(poules: Poule[]) {
    this.myPoules.replace(poules)
  }

  setAllSpeelrondes(poules: Speelronde[]) {
    this.allSpeelrondes.replace(poules)
  }

  getAllemeenKlassement(): void {
    BeachAgent.getAlgemeenKlassement()
      .then(response => {
        const asd = AlgemeenKlassement.fromApi(response)
        this.setAlgemeenKlassement(asd)
      })
      .catch(error => {
        const asd = 1
      })
  }

  setAlgemeenKlassement(algemeenKlassement: AlgemeenKlassement): void {
    this.algemeenKlassement = algemeenKlassement
  }

  updateWedstrijd(wedstrijd: Wedstrijd) {
    return BeachAgent.updateWedstrijd(wedstrijd).then(() => {})
  }

  login = (username: string, password: string): Promise<void> =>
    BeachAgent.login(username, password)
      .then(response => {
        const user = new User(response.id, response.username, response.token)

        this.setUser(user)
        apiService.setAuthenticationToken(user.token)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          throw new AppError('Error')
        }
        throw new AppError('Something went wrong, please try again')
      })

  logout = () =>
    BeachAgent.logout()
      .then(() => {
        apiService.setAuthenticationToken(null)
        this.setUser(null)
      })
      .catch(() => {})
}

export default BeachStore
