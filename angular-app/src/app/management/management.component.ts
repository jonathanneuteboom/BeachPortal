import { Component, OnInit } from '@angular/core';

import { DeleteTeamDialogComponent } from '../dialogs/delete-team-dialog/delete-team-dialog.component';
import { EditTeamDialogComponent } from '../dialogs/edit-team-dialog/edit-team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NieuweRondeDialogComponent } from '../dialogs/nieuwe-ronde-dialog/nieuwe-ronde-dialog.component';
import { Speler } from '../models/Speler';
import { Team } from '../models/Team';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  displayedColumns: string[] = ['naam', 'spelers', 'wijzigen'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  teams: Team[] = [
    new Team(1, 'Binkies Alfa', [
      new Speler(1, 'Jonathan Neuteboom'),
      new Speler(2, 'Sjoerd Verbeek'),
    ]),
    new Team(2, 'Binkies Beta', [
      new Speler(3, 'Niels Barelds'),
      new Speler(4, 'Coen Versluijs'),
    ]),
    new Team(3, 'Binkies Gamma', [
      new Speler(5, 'Jurian Meijerhof'),
      new Speler(6, 'Friso van Bokhorst'),
    ]),
    new Team(4, 'Binkies Delta', [
      new Speler(7, 'Huub Adriaanse'),
      new Speler(8, 'Joris Heinsbroek'),
    ]),
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  nieuwTeam() {
    this.dialog.open(EditTeamDialogComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  deleteTeam() {
    this.dialog.open(DeleteTeamDialogComponent);
  }

  nieuweRonde() {
    this.dialog.open(NieuweRondeDialogComponent);
  }

  addColumn(): void {}
}
