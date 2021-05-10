import { Poule } from './Poule';

export class Speelronde {
    id: number;
    nummer: number;
    heren: Poule[];
    dames: Poule[];
    mix: Poule[];

    constructor(id: number, nummer: number, heren: Poule[], dames: Poule[], mix: Poule[]) {
        this.id = id;
        this.nummer = nummer;
        this.heren = heren;
        this.dames = dames;
        this.mix = mix;
    }
}
