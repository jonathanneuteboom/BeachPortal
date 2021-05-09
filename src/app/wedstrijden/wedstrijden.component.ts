import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { UitslagInvoerenDialogComponent } from '../dialogs/uitslag-invoeren-dialog/uitslag-invoeren-dialog.component';
import { Wedstrijd } from '../models/Wedstrijd';

@Component({
  selector: 'app-wedstrijden',
  templateUrl: './wedstrijden.component.html',
  styleUrls: ['./wedstrijden.component.scss']
})
export class WedstrijdenComponent implements OnInit {
  @Input() wedstrijden: Wedstrijd[];

  displayedColumns = ['team1', 'team2', 'uitslag', 'wijzigen']
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  uitslagAanpassen(){
    this.dialog.open(UitslagInvoerenDialogComponent);
  }
}
