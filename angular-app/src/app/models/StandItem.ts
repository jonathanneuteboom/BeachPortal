import { Team } from './Team';

export class StandItem {
  constructor(
    public team: Team,
    public gewonnenWedstrijden: number,
    public puntenVoor: number,
    public puntenTegen: number,
    public puntenquotient: number
  ) {}
}
