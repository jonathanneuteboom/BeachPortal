import { Team } from './Team';

export class StandItem {
    team: Team;
    gewonnenWedstrijden: number;
    puntenVoor: number;
    puntenTegen: number;
    puntenquotient: number;

    constructor(
        team: Team,
        gewonnenWedstrijden: number,
        puntenVoor: number,
        puntenTegen: number,
        puntenquotient: number
    ) {
        this.team = team;
        this.gewonnenWedstrijden = gewonnenWedstrijden;
        this.puntenVoor = puntenVoor;
        this.puntenTegen = puntenTegen;
        this.puntenquotient = puntenquotient;
    }
}
