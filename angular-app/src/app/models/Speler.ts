export class Speler {
  public id: number;
  public naam: string;

  public constructor(init?: Partial<Speler>) {
    Object.assign(this, init);
  }
}
