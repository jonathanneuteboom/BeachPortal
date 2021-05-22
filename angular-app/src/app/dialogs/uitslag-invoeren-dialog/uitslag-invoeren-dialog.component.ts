import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wedstrijd } from 'src/app/models/Wedstrijd';
import { WedstrijdService } from 'src/app/services/wedstrijd.service';

@Component({
  selector: 'app-uitslag-invoeren-dialog',
  templateUrl: './uitslag-invoeren-dialog.component.html',
  styleUrls: ['./uitslag-invoeren-dialog.component.scss']
})
export class UitslagInvoerenDialogComponent implements OnInit {
  form: FormGroup;
  wedstrijd: Wedstrijd;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) wedstrijd: Wedstrijd,
    private wedstrijdService: WedstrijdService,
    private dialogRef: MatDialogRef<UitslagInvoerenDialogComponent>
  ) {
    this.wedstrijd = Object.assign({}, wedstrijd);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      puntenTeam1: this.wedstrijd.puntenTeam1,
      puntenTeam2: this.wedstrijd.puntenTeam2
    });
  }

  changePoints(teamId: number, delta: number): void {
    if (this.wedstrijd.team1.id === teamId) {
      const newScore = this.wedstrijd.puntenTeam1 + delta;
      this.wedstrijd.puntenTeam1 = Math.max(0, newScore);
    } else {
      const newScore = this.wedstrijd.puntenTeam2 + delta;
      this.wedstrijd.puntenTeam2 = Math.max(0, newScore);
    }
  }

  updateScore(asd, team): void {
    switch (team) {
      case '1':
        this.form.controls.puntenTeam1.setValue(asd.value);
        return;
      case '2':
        this.form.controls.puntenTeam2.setValue(asd.value);
        return;
      default:
        throw new Error('Onbekend team ' + team);
    }
  }

  save(wedstrijd: Wedstrijd): void {
    this.wedstrijd.puntenTeam1 = this.form.value.puntenTeam1;
    this.wedstrijd.puntenTeam2 = this.form.value.puntenTeam2;

    this.wedstrijdService.uitslagInvoeren(this.wedstrijd).subscribe(() => {
      this.dialogRef.close();
    });
  }

  clear(): void {
    const wedstrijd = Object.assign({}, this.wedstrijd);
    wedstrijd.puntenTeam1 = 0;
    wedstrijd.puntenTeam2 = 0;

    this.save(wedstrijd);
  }
}
