import { Component, Input, OnInit } from '@angular/core';
import { Wedstrijd } from '../models/Wedstrijd';

@Component({
  selector: 'app-wedstrijden',
  templateUrl: './wedstrijden.component.html',
  styleUrls: ['./wedstrijden.component.scss']
})
export class WedstrijdenComponent implements OnInit {
  @Input() wedstrijden: Wedstrijd[];

  displayedColumns = ['team1', 'team2', 'uitslag', 'wijzigen']
  constructor() { }

  ngOnInit(): void {
  }

}
