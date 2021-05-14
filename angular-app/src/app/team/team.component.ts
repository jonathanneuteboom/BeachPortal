import { Component, Input, OnInit } from '@angular/core';

import { Team } from '../models/Team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() team: Team;
  constructor() {}

  ngOnInit(): void {}

  getSpelers(team: Team): string {
    return team.spelers
      .map((element) => {
        return element.naam;
      })
      .join(', ');
  }
}
