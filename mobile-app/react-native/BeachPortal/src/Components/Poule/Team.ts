import { Person } from '../../Authentication/Person'

export class Team {
  public players: Person[] = []

  constructor(public id: number, public name: string) {}
}
