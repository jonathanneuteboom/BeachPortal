import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Categorie } from '../models/Categorie';
import { Speelronde } from '../models/Speelronde';
import { SpeelrondeService } from '../services/speelronde.service';

@Component({
  selector: 'app-speelrondes',
  templateUrl: './speelrondes.component.html',
  styleUrls: ['./speelrondes.component.scss']
})
export class SpeelrondesComponent implements OnInit {
  form: FormGroup;
  speelrondes: Speelronde[] = [];
  heren = Categorie.Heren;
  dames = Categorie.Dames;
  mix = Categorie.Mix;

  constructor(
    private fb: FormBuilder,
    private speelrondeService: SpeelrondeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      categorie: Categorie.Heren,
      speelronde: 1
    });

    this.getSpeelrondes();
  }

  getSpeelrondes(): void {
    this.speelrondeService.getAllSpeelrondes().subscribe((speelrondes) => {
      speelrondes = speelrondes || [];
      speelrondes.forEach((speelronde) =>
        speelronde.poules.forEach((poule) => (poule.teams = null))
      );
      this.speelrondes = speelrondes;

      if (speelrondes.length === 0) return;

      this.form = this.fb.group({
        categorie: Categorie.Heren,
        speelronde: speelrondes[speelrondes.length - 1].nummer
      });
    });
  }
}
