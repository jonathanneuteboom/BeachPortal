import { Speler } from "./Speler";

export class Team {
  spelers: Speler[];
  naam: string;

  constructor(naam: string, spelers: Speler[]) {
    this.naam = naam;
    this.spelers = spelers;
  }
}
