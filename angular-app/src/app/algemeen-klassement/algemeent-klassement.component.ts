import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SpeelrondeService } from '../services/speelronde.service';

@Component({
  selector: 'app-algemeen-klassement',
  templateUrl: './algemeen-klassement.component.html',
  styleUrls: ['./algemeen-klassement.component.scss']
})
export class AlgemeenKlassementComponent implements OnInit {
  form: FormGroup;
  klassement: any[];
  currentKlassement;
  displayedColumns = ['rank', 'team', 'totaal'];
  puntenColumns = []

  constructor(
    private fb: FormBuilder,
    private speelrondeService: SpeelrondeService
  ) {}

  getElement(element, index): string {
    return element.punten[index]
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      categorie: 0
    });

    this.getKlassement();
  }

  getKlassement(): void {
    this.speelrondeService.getAlgemeenKlassement().subscribe((klassement) => {
      this.klassement = klassement;

      this.currentKlassement = klassement[0].ranking;
      this.currentKlassement[0].punten.forEach((_, i) => this.puntenColumns.push(`ronde ${i + 1}`))

      this.displayedColumns = this.displayedColumns.concat(this.puntenColumns)

      this.form = this.fb.group({
        categorie: 0
      });

      this.form.get('categorie').valueChanges.subscribe({
        next: (categorie) => {
          this.currentKlassement = this.klassement[categorie].ranking
        }
      });
    });
  }

  getPuntenString(puntenVerloop: any[]):string {
    return puntenVerloop.map((punten, i) => `${i + 1}: (${punten[0]}, ${punten[1]})`).join(' > ')
  }

  getTooltipText(puntenVerloop):string {
    let poulePunten = `${puntenVerloop[0]} poulepunt`
    if (puntenVerloop[0] !== 1) poulePunten += 'en'

    let wedstrijdpunten = `${puntenVerloop[1]} wedstrijdpunt`
    if (puntenVerloop[1] !== 1) wedstrijdpunten += 'en'
    return `${poulePunten}, ${wedstrijdpunten}`
  }
}
