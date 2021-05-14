import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategorieHelper } from 'src/app/models/Categorie';
import { Speler } from 'src/app/models/Speler';
import { Team } from 'src/app/models/Team';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss']
})
export class EditTeamDialogComponent {
  form: FormGroup;
  options = CategorieHelper.getAllCategorien();

  spelersMetNaam: Speler[];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Team,
    private teamService: TeamService,
    private dialogRef: MatDialogRef<EditTeamDialogComponent>,
    private snackbar: MatSnackBar,
    private userService: UserService
  ) {
    this.form = fb.group({
      id: [data.id],
      naam: [data.naam],
      categorie: [data.categorie],
      spelers: fb.array([])
    });

    data.spelers.forEach((speler) => this.addSpeler(speler));
    while (this.form.get('spelers').value.length < 2) {
      this.addSpeler();
    }
  }

  get spelers(): FormArray {
    return this.form.get('spelers') as FormArray;
  }

  onSelectedSpeler(): void {
    this.spelersMetNaam = [];
  }

  addSpeler(speler: Speler = null): void {
    const formGroup = this.fb.control({
      id: speler?.id,
      naam: speler?.naam
    });
    formGroup.valueChanges.subscribe({
      next: (naam: string) => {
        this.userService.getUsersWithName(naam).subscribe({
          next: (spelers: Speler[]) => {
            this.spelersMetNaam = spelers;
          }
        });
      }
    });

    const spelers = this.form.get('spelers') as FormArray;
    spelers.push(formGroup);
  }

  displayFn(speler: Speler): any {
    return speler?.naam;
  }

  deleteSpeler(i: number): void {
    if (this.spelers.length <= 2) return;

    this.spelers.removeAt(i);
  }

  getSpelerInputText(i: number): string {
    return `${i}${this.getOrdinalSuffix(i)} player`;
  }

  getTitle(): string {
    const action = this.form.get('id').value === null ? 'Add' : 'Edit';
    return `${action} team`;
  }

  getOrdinalSuffix(number: number): string {
    const unit = number % 10;
    const tenths = number % 100;
    if (unit === 1 && tenths !== 11) {
      return 'st';
    }
    if (unit === 2 && tenths !== 12) {
      return 'nd';
    }
    if (unit === 3 && tenths !== 13) {
      return 'rd';
    }
    return 'th';
  }

  save(): void {
    const team = this.form.value as Team;
    this.teamService.updateTeam(team).subscribe({
      next: () => {
        this.dialogRef.close(team);
      },
      error: (error) => {
        this.snackbar.open(error.error.message, 'ERROR');
      }
    });
  }
}
