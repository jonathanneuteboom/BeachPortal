import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { Categorie } from '../models/Categorie';
import { Poule } from '../models/Poule';
import { PouleService } from '../services/poule.service';
import { Team } from '../models/Team';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PouleComponent {
  @Input() poule: Poule;
  @Input() isManagement: boolean;
  @Output() onChange: EventEmitter<Poule> = new EventEmitter();

  heren = Categorie.Heren;
  dames = Categorie.Dames;
  mix = Categorie.Mix;

  constructor(private pouleService: PouleService) {}

  getCategorie(categorie: Categorie): string {
    return Categorie[categorie];
  }

  deletePoule(): void {
    this.pouleService
      .deletePoule(this.poule)
      .subscribe(() => this.onChange.emit(this.poule));
  }

  deleteTeam(poule: Poule, team: Team): void {
    this.pouleService
      .deleteTeamFromPoule(poule, team)
      .subscribe(() => this.onChange.emit(this.poule));
  }

  onWedstrijdChanged(): void {
    this.onChange.emit();
  }
}
