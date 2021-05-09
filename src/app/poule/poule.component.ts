import { Component, Input, OnInit } from '@angular/core';
import { Poule } from '../models/Poule';

@Component({
  selector: 'app-poule',
  templateUrl: './poule.component.html',
  styleUrls: ['./poule.component.scss']
})
export class PouleComponent implements OnInit {
  @Input() poule: Poule;
  
  constructor() { }

  ngOnInit(): void {
  }

}
