import { RouterModule, Routes } from '@angular/router'; // CLI imports router

import { AlgemeneInformatieComponent } from './algemene-informatie/algemene-informatie.component';
import { ManagementComponent } from './management/management.component';
import { MyBeachComponent } from './my-beach/my-beach.component';
import { NgModule } from '@angular/core';
import { SpeelrondesComponent } from './speelrondes/speelrondes.component';
import { AlgemeenKlassementComponent } from './algemeen-klassement/algemeent-klassement.component';

const routes: Routes = [
  { path: 'my-beach', component: MyBeachComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'speelrondes', component: SpeelrondesComponent },
  { path: 'algemene-informatie', component: AlgemeneInformatieComponent },
  { path: 'algemeen-klassement', component: AlgemeenKlassementComponent },

  { path: '', redirectTo: 'my-beach', pathMatch: 'full' },

  { path: '**', redirectTo: 'my-beach' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
