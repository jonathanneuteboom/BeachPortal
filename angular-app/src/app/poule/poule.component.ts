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
import { Speellocatie } from '../models/Speellocatie';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PouleComponent implements OnInit {
  @Input() poule: Poule;
  @Input() isManagement: boolean;
  @Input() speellocaties: Speellocatie[];
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
    const timeslotSize = 30
    for (let hours = 9; hours <= 23; hours++) {
      for (let minutes = 0; minutes < 60; minutes += timeslotSize) {
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
      datum: [{ value: timestamp, disabled: true }],
      tijd: time,
      speellocatie: this.poule.speellocatie
    });
  }

  compareSpeellocaties = (a: Speellocatie, b: Speellocatie): boolean => a.id === b.id

  updateSpeeltijd(): void {
    const [hours, minutes] = this.form.value.tijd.split(':')
    const newSpeeltijd = this.form.get('datum').value as Date;
    newSpeeltijd.setHours(hours)
    newSpeeltijd.setMinutes(minutes)

    const speellocatie = this.form.get('speellocatie').value;

    const poule = Object.assign({}, this.poule);
    poule.speeltijd = newSpeeltijd.toISOString();
    poule.speellocatie = speellocatie
    this.pouleService
      .updatePoule(poule)
      .subscribe(() => this.onChange.emit());
  }

  deletePoule(): void {
    this.pouleService
      .deletePoule(this.poule)
      .subscribe(() => this.onChange.emit(this.poule));
  }

  deleteTeam(poule: Poule, team: Team): void {
    this.pouleService.deleteTeamFromPoule(poule, team).subscribe(() => {
      this.onChange.emit(this.poule);
    });
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

  private formatDate(date: Date): string {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
