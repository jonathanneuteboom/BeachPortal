import { Component, Input, OnInit } from '@angular/core';

import { StandItem } from '../models/StandItem';

@Component({
  selector: 'app-stand',
  templateUrl: './stand.component.html',
  styleUrls: ['./stand.component.scss']
})
export class StandComponent implements OnInit {
  @Input() stand: StandItem[];

  displayedColumns: string[] = [
    'team',
    'gewonnenWedstrijden',
    'puntenVoor',
    'puntenTegen',
    'quotient'
  ];

  constructor() {}

  ngOnInit(): void {}
}
