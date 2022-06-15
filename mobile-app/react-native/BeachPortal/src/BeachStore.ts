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

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,
    })

    this.cache.user.getEntity().then(user => {
      if (!user) return

      this.setUser(user)
      apiService.setAuthenticationToken(user.token)
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

  getMyPoules = () => BeachAgent.myPoules().then(poules => poules.map(Poule.fromApi))

  getAllSpeelronde = () =>
    BeachAgent.allSpeelrondes().then(speelronde => speelronde.map(Speelronde.fromApi))

  getAlgemeenKlassement = () =>
    BeachAgent.getAlgemeenKlassement().then(response => AlgemeenKlassement.fromApi(response))

  updateWedstrijd = (wedstrijd: Wedstrijd) => BeachAgent.updateWedstrijd(wedstrijd).then(() => {})

  login = (username: string, password: string) =>
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

  logout = () => {
    apiService.setAuthenticationToken(null)
    this.setUser(null)
  }
}

export default BeachStore
