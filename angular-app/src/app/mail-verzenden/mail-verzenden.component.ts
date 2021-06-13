import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Categorie } from '../models/Categorie';
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

  placeholders = ['NAAM', 'DATUM', 'POULE', 'TIJD', 'TEAMS'];

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
      this.poules = speelronde.poules;

      this.initForm();
    });
  }

  initForm(): void {
    if (this.teams.length === 0 || this.poules.length === 0) return;

    this.form = this.fb.group({
      teams: null,
      poules: null,
      titel: null,
      body: null
    });
  }

  getPouleNaam(poule: Poule): string {
    return `${Categorie[poule.categorie]} ${poule.naam}`;
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
      .subscribe((body) => {
        this.form.get('body').setValue(body);
        this.form.get('titel').setValue('Beachprogramma {{DATUM}}');
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
    const formControl = this.form.get('body');
    let body = formControl.value;
    body += `{{${placeholder}}}`;
    formControl.setValue(body);
  }

  private toggle(formControl: FormControl, items: any[]): void {
    if (formControl.value && formControl.value.length > 0) {
      formControl.setValue(null);
    } else {
      formControl.setValue(items.map((item) => item.id));
    }
  }
}
