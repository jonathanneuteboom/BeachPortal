import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AlgemeneInformatieComponent } from './algemene-informatie/algemene-informatie.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent } from './calendar/calendar.component';
import { DeleteTeamDialogComponent } from './dialogs/delete-team-dialog/delete-team-dialog.component';
import { EditTeamDialogComponent } from './dialogs/edit-team-dialog/edit-team-dialog.component';
import { ManagementComponent } from './management/management.component';
import { MyBeachComponent } from './my-beach/my-beach.component';
import { NgModule } from '@angular/core';
import { NieuweRondeDialogComponent } from './dialogs/nieuwe-ronde-dialog/nieuwe-ronde-dialog.component';
import { PouleComponent } from './poule/poule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpeelrondesComponent } from './speelrondes/speelrondes.component';
import { StandComponent } from './stand/stand.component';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { UitslagInvoerenDialogComponent } from './dialogs/uitslag-invoeren-dialog/uitslag-invoeren-dialog.component';
import { WedstrijdenComponent } from './wedstrijden/wedstrijden.component';

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
    PouleComponent,
    TeamComponent,
    TeamsComponent,
    EditTeamDialogComponent,
    DeleteTeamDialogComponent,
    NieuweRondeDialogComponent,
    UitslagInvoerenDialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
