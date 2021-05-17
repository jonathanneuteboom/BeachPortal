import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
export class PouleComponent implements OnInit {
  @Input() poule: Poule;
  @Input() isManagement: boolean;
  @Output() onChange: EventEmitter<Poule> = new EventEmitter();

  heren = Categorie.Heren;
  dames = Categorie.Dames;
  mix = Categorie.Mix;
  isEditingSpeeltijd = false;
  form: FormGroup;
  tijden: string[];

  constructor(private pouleService: PouleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.tijden = [];
    for (let hours = 9; hours <= 23; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 10) {
        const h = this.padLeadingZeros(hours, 2);
        const m = this.padLeadingZeros(minutes, 2);
        this.tijden.push(`${h}:${m}`);
      }
    }
    const timestamp = new Date(this.poule.speeltijd);
    const minutes = this.padLeadingZeros(timestamp.getMinutes(), 2);
    const hours = this.padLeadingZeros(timestamp.getHours(), 2);
    const time = `${hours}:${minutes}`;
    this.form = this.fb.group({
      datum: { timestamp, disabled: true },
      tijd: time
    });
  }

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

  private padLeadingZeros(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }
}
