import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { EmailService } from '../services/email.service';
import { EmailVersturenComponent } from '../dialogs/email-versturen/email-versturen.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Poule } from '../models/Poule';
import { SpeelrondeService } from '../services/speelronde.service';
import { Team } from '../models/Team';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-mail-verzenden',
  templateUrl: './mail-verzenden.component.html',
  styleUrls: ['./mail-verzenden.component.scss']
})
export class MailVerzendenComponent implements OnInit {
  teams: Team[] = [];
  poules: Poule[] = [];
  form: FormGroup;

  placeholders = [
    { tag: 'NAAM', value: 'NAAM' },
    { tag: 'SPEELTIJD', value: 'SPEELTIJD|date:"l j F Y"' },
    { tag: 'POULE', value: 'POULE' },
    { tag: 'SPEELTIJD', value: 'SPEELTIJD|date:"H:i"' },
    { tag: 'TEAMS', value: 'TEAMS' },
    { tag: 'LOCATIE', value: 'LOCATIE' },
    { tag: 'SPEELRONDE', value: 'SPEELRONDE' }
  ];

  constructor(
    private teamService: TeamService,
    private speelrondeService: SpeelrondeService,
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private emailService: EmailService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamService.getAll().subscribe((teams) => {
      this.teams = teams;

      this.initForm();
    });

    this.speelrondeService.GetCurrentSpeelronde().subscribe((speelronde) => {
      this.poules = speelronde?.poules ?? [];

      this.initForm();
    });
  }

  initForm(): void {
    if (this.teams.length === 0 || this.poules.length === 0) return;

    this.form = this.fb.group({
      teams: [],
      poules: [],
      title: null,
      message: ''
    });
  }

  getPouleNaam(poule: Poule): string {
    return `${poule.categorieValue} ${poule.nummer}`;
  }

  testVersturen(): void {
    const mail = Object.assign({}, this.form.value);
    mail.isTestMail = true;
    this.emailService.EmailVersturen(mail).subscribe();
  }

  versturen(): void {
    const dialogRef = this.dialog.open(EmailVersturenComponent);
    dialogRef.afterClosed().subscribe((response) => {
      if (!response) return;

      const mail = Object.assign({}, this.form.value);
      this.emailService.EmailVersturen(mail).subscribe();
    });
  }

  setTemplate(template: string): void {
    this.httpClient
      .get(`assets/mail-templates/${template}.txt`, { responseType: 'text' })
      .subscribe((message) => {
        this.form.get('message').setValue(message);
        this.form
          .get('title')
          .setValue('Beachprogramma speelronde {{SPEELRONDE}}');
      });
  }

  toggleTeams(): void {
    const formControl = this.form.get('teams') as FormControl;
    this.toggle(formControl, this.teams);
  }

  togglePoules(): void {
    const formControl = this.form.get('poules') as FormControl;
    this.toggle(formControl, this.poules);
  }

  addPlaceholder(placeholder: string): void {
    const formControl = this.form.get('message');
    let message = formControl.value;
    message += `{{${placeholder}}}`;
    formControl.setValue(message);
  }

  private toggle(formControl: FormControl, items: any[]): void {
    if (formControl.value && formControl.value.length > 0) {
      formControl.setValue(null);
    } else {
      formControl.setValue(items.map((item) => item.id));
    }
  }
}
