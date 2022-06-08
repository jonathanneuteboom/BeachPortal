interface LoginResponse {
  id: number
  username: string
  token: string
}

type SpelerListResponse = SpelerResponse[]
interface SpelerResponse {
  id: number
  naam: string
  is_staff: boolean
}

type TeamListResponse = TeamResponse[]
interface TeamResponse {
  id: number
  naam: string
  spelers: SpelerListResponse
  categorie: string
  categorieValue: string
}

interface SpeellocatieResponse {
  id: number
  naam: string
}

type WedstrijdListResponse = WedstrijdResponse[]
interface WedstrijdResponse {
  id: number
  team1: TeamResponse
  team2: TeamResponse
  puntenTeam1: number
  puntenTeam2: number
}

type StandListResponse = StandResponse[]
interface StandResponse {
  puntenVoor: number
  puntenTegen: number
  quotient: number
  gewonnenWedstrijden: number
  team: TeamResponse
}

type PouleListResponse = PouleResponse[]
interface PouleResponse {
  id: number
  nummer: number
  categorie: string
  categorieValue: string
  speeltijd: string
  teams: TeamListResponse
  speellocatie: SpeellocatieResponse
  wedstrijden: WedstrijdListResponse
  stand: StandListResponse
}

type SpeelrondeListResponse = SpeelrondeResponse[]
interface SpeelrondeResponse {
  id: number
  nummer: number
  poules: PouleListResponse
}

type AlgemeenKlassementListResponse = AlgemeenKlassementResponse[]
type AlgemeenKlassementResponse = {
  categorie: string
  ranking: AlgemeenKlassementItemResponse[]
}
type AlgemeenKlassementItemResponse = {
  punten: number[]
  totaal: number
  team: TeamResponse
}

export type {
  LoginResponse,
  SpelerListResponse,
  SpelerResponse,
  TeamListResponse,
  TeamResponse,
  SpeellocatieResponse,
  WedstrijdListResponse,
  WedstrijdResponse,
  StandListResponse,
  StandResponse,
  PouleResponse,
  PouleListResponse,
  SpeelrondeListResponse,
  SpeelrondeResponse,
  AlgemeenKlassementListResponse,
  AlgemeenKlassementItemResponse,
}
