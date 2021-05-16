import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { UitslagInvoerenDialogComponent } from '../dialogs/uitslag-invoeren-dialog/uitslag-invoeren-dialog.component';
import { Wedstrijd } from '../models/Wedstrijd';

@Component({
  selector: 'app-wedstrijden',
  templateUrl: './wedstrijden.component.html',
  styleUrls: ['./wedstrijden.component.scss']
})
export class WedstrijdenComponent implements OnInit {
  @Input() wedstrijden: Wedstrijd[];
  @Output() onChange = new EventEmitter<any>();

  displayedColumns = ['teams', 'uitslag', 'wijzigen'];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  uitslagAanpassen(wedstrijd: Wedstrijd): void {
    const config = new MatDialogConfig<Wedstrijd>();
    config.disableClose = true;
    config.width = '400px';
    config.data = wedstrijd;

    const dialogRef = this.dialog.open(UitslagInvoerenDialogComponent, config);
    dialogRef.afterClosed().subscribe(() => this.onChange.emit());
  }
}
