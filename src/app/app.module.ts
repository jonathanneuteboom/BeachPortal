import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MyBeachComponent } from './my-beach/my-beach.component';
import { SpeelrondesComponent } from './speelrondes/speelrondes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AlgemeneInformatieComponent } from './algemene-informatie/algemene-informatie.component';

import { ManagementComponent } from './management/management.component';

import { WedstrijdenComponent } from './wedstrijden/wedstrijden.component';
import { StandComponent } from './stand/stand.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PouleComponent } from './poule/poule.component';

@NgModule({
  declarations: [
    AppComponent,
    MyBeachComponent,
    SpeelrondesComponent,
    CalendarComponent,
    AlgemeneInformatieComponent,
    ManagementComponent,
    StandComponent,
    WedstrijdenComponent,
    PouleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
