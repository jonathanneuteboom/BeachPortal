import { Component, Input, OnInit } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { EditTeamDialogComponent } from '../dialogs/edit-team-dialog/edit-team-dialog.component'
import { Speler } from '../models/Speler'
import { Team } from '../models/Team'
import { Wedstrijd } from '../models/Wedstrijd'

@Component({
  selector: 'app-wedstrijden',
  templateUrl: './wedstrijden.component.html',
  styleUrls: ['./wedstrijden.component.scss'],
})
export class WedstrijdenComponent implements OnInit {
  @Input() wedstrijden: Wedstrijd[]

  displayedColumns = ['team1', 'team2', 'uitslag', 'wijzigen']
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  uitslagAanpassen() {
    const config = new MatDialogConfig<Team>()
    config.data = new Team(1, 'Henk&Piet', [
      new Speler(1, 'Henk'),
      new Speler(2, 'Piet'),
    ])

    this.dialog.open(EditTeamDialogComponent, config)
  }
}
