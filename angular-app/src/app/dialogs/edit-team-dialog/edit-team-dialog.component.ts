import { Component, Inject, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Team } from 'src/app/models/Team'

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss']
})
export class EditTeamDialogComponent implements OnInit {
  form: FormGroup

  constructor(fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Team) {
    const spelerControls = data.spelers.map((speler) =>
      fb.group({
        id: speler.id,
        naam: speler.naam,
        asd: 1
      })
    )
    this.form = fb.group({
      id: [data.id],
      naam: [data.naam],
      spelers: fb.array(spelerControls)
    })
  }

  get spelers(): FormArray {
    return this.form.get('spelers') as FormArray
  }

  ngOnInit(): void {}

  spelerToevoegen(): void {}

  getSpelerInputText(i: number): string {
    return `${i}${this.getOrdinalSuffix(i)} player`
  }

  getOrdinalSuffix(number: number): string {
    const unit = number % 10
    const tenths = number % 100
    if (unit === 1 && tenths !== 11) {
      return 'st'
    }
    if (unit === 2 && tenths !== 12) {
      return 'nd'
    }
    if (unit === 3 && tenths !== 13) {
      return 'rd'
    }
    return 'th'
  }
}
