import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team } from 'app/models/Team';
import { TeamService } from 'app/services/team.service';

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
    private dialogRef: MatDialogRef<DeleteTeamDialogComponent>
  ) {
    this.team = data;
  }

  deleteTeam(): void {
    this.teamService
      .deleteTeam(this.team)
      .subscribe(() => this.dialogRef.close());
  }

  getTitle(): string {
    return `Delete ${this.team.naam}`;
  }
}
