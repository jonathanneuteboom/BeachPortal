import { Component, Input, OnInit } from '@angular/core';

import { Team } from '../models/Team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  @Input() teams: Team[];

  displayedColumns = ['teamnaam'];

  constructor() {
    var asd = 1;
  }

  ngOnInit(): void {
    var asd = 1;
  }
}
