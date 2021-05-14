import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Team } from 'src/app/models/Team';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { EditTeamDialogComponent } from '../edit-team-dialog/edit-team-dialog.component';

@Component({
  selector: 'app-delete-team-dialog',
  templateUrl: './delete-team-dialog.component.html',
  styleUrls: ['./delete-team-dialog.component.scss']
})
export class DeleteTeamDialogComponent {
  team: Team;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Team,
    private teamService: TeamService,
    private dialogRef: MatDialogRef<EditTeamDialogComponent>,
    private snackbar: MatSnackBar,
    private userService: UserService
  ) {
    this.team = data;
  }

  deleteTeam(): void {
    this.teamService.deleteTeam(this.team).subscribe();
  }

  getTitle(): string {
    return `Delete ${this.team.naam}`;
  }
}
