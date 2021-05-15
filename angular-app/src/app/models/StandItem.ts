import { Team } from './Team';

export class StandItem {
  public team: Team;
  public gewonnenWedstrijden: number;
  public puntenVoor: number;
  public puntenTegen: number;
  public quotient: number;

  public constructor(init?: Partial<StandItem>) {
    Object.assign(this, init);
  }
}
