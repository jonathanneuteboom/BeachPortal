import apiService from './ApiService'
import { Wedstrijd } from './Components/Poule/Match'
import {
  AlgemeenKlassementListResponse,
  LoginResponse,
  PouleListResponse,
  SpeelrondeListResponse,
} from './Responses'

class BeachAgent {
  static getAlgemeenKlassement = () =>
    apiService
      .get(`api/algemeen-klassement`)
      .then(
        (response: { data: AlgemeenKlassementListResponse }) => response.data,
      )

  static updateWedstrijd = (wedstrijd: Wedstrijd): Promise<void> =>
    apiService
      .put(`api/wedstrijd/${wedstrijd.id}/`, {
        puntenTeam1: wedstrijd.puntenTeam1,
        puntenTeam2: wedstrijd.puntenTeam2,
      })
      .then(() => {})

  static login = (username: string, password: string) =>
    apiService
      .post('api/user/login', { username, password })
      .then((response: { data: LoginResponse }) => response.data)

  static logout = () => apiService.post('api/user/logout', {})

  static myPoules = () =>
    apiService
      .get('api/poule/my')
      .then((response: { data: PouleListResponse }) => response.data)

  static allSpeelrondes = () =>
    apiService
      .get('api/speelronde/all')
      .then((response: { data: SpeelrondeListResponse }) => response.data)
}

export default BeachAgent
