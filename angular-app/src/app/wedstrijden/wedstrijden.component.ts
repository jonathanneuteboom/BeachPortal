import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Categorie } from '../models/Categorie';
import { EditTeamDialogComponent } from '../dialogs/edit-team-dialog/edit-team-dialog.component';
import { Speler } from '../models/Speler';
import { Team } from '../models/Team';
import { Wedstrijd } from '../models/Wedstrijd';

@Component({
  selector: 'app-wedstrijden',
  templateUrl: './wedstrijden.component.html',
  styleUrls: ['./wedstrijden.component.scss']
})
export class WedstrijdenComponent implements OnInit {
  @Input() wedstrijden: Wedstrijd[];

  displayedColumns = ['team1', 'team2', 'uitslag', 'wijzigen'];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  uitslagAanpassen(): void {
    const config = new MatDialogConfig<Team>();
    config.disableClose = true;
    config.width = '400px';
    config.data = new Team({
      naam: 'Henk&Piet',
      categorie: Categorie.Heren,
      spelers: [new Speler({ naam: 'Henk' }), new Speler({ naam: 'Piet' })]
    });

    this.dialog.open(EditTeamDialogComponent, config);
  }
}
