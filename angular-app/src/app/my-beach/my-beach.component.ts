import { Component, OnInit } from '@angular/core';

import { Poule } from '../models/Poule';
import { PouleService } from '../services/poule.service';

@Component({
  selector: 'app-my-beach',
  templateUrl: './my-beach.component.html',
  styleUrls: ['./my-beach.component.scss']
})
export class MyBeachComponent implements OnInit {
  poules: Poule[];

  constructor(private pouleService: PouleService) {}

  ngOnInit(): void {
    this.GetMyPoules();
  }

  GetMyPoules(): void {
    this.pouleService.getMyPoules().subscribe((poules) => {
      poules = poules || [];
      poules.forEach((poule) => (poule.teams = null));
      this.poules = poules;
    });
  }

  onPouleChanged(): void {
    this.GetMyPoules();
  }
}
