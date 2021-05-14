import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AddCredentialsInterceptor } from './interceptors/add-credentials.interceptor';
import { AlgemeneInformatieComponent } from './algemene-informatie/algemene-informatie.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DeleteTeamDialogComponent } from './dialogs/delete-team-dialog/delete-team-dialog.component';
import { EditTeamDialogComponent } from './dialogs/edit-team-dialog/edit-team-dialog.component';
import { HTTPResponseCodeInterceptor } from './interceptors/http-response-code.interceptor';
import { LoginComponent } from './login/login.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ManagementComponent } from './management/management.component';
import { MyBeachComponent } from './my-beach/my-beach.component';
import { NgModule } from '@angular/core';
import { NieuweRondeDialogComponent } from './dialogs/nieuwe-ronde-dialog/nieuwe-ronde-dialog.component';
import { PouleComponent } from './poule/poule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpeelrondesComponent } from './speelrondes/speelrondes.component';
import { StandComponent } from './stand/stand.component';
import { TeamComponent } from './team/team.component';
import { UitslagInvoerenDialogComponent } from './dialogs/uitslag-invoeren-dialog/uitslag-invoeren-dialog.component';
import { WedstrijdenComponent } from './wedstrijden/wedstrijden.component';

const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HTTPResponseCodeInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AddCredentialsInterceptor,
    multi: true
  },
  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
];

@NgModule({
  declarations: [
    AppComponent,
    MyBeachComponent,
    SpeelrondesComponent,
    AlgemeneInformatieComponent,
    ManagementComponent,
    StandComponent,
    WedstrijdenComponent,
    PouleComponent,
    TeamComponent,
    EditTeamDialogComponent,
    DeleteTeamDialogComponent,
    NieuweRondeDialogComponent,
    UitslagInvoerenDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [providers],
  bootstrap: [AppComponent]
})
export class AppModule {}
