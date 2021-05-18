import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import {
  MAT_DATE_FORMATS,
  MatDateFormats,
  MatNativeDateModule
} from '@angular/material/core';

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
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ManagementComponent } from './management/management.component';
import { MyBeachComponent } from './my-beach/my-beach.component';
import { NieuweRondeDialogComponent } from './dialogs/nieuwe-ronde-dialog/nieuwe-ronde-dialog.component';
import { PouleComponent } from './poule/poule.component';
import { ProgrammaVersturenComponent } from './dialogs/programma-versturen/programma-versturen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpeelrondesComponent } from './speelrondes/speelrondes.component';
import { StandComponent } from './stand/stand.component';
import { TeamComponent } from './team/team.component';
import { UitslagInvoerenDialogComponent } from './dialogs/uitslag-invoeren-dialog/uitslag-invoeren-dialog.component';
import { WedstrijdenComponent } from './wedstrijden/wedstrijden.component';
import locale from '@angular/common/locales/nl';
import { registerLocaleData } from '@angular/common';

registerLocaleData(locale);

const dateFormats: MatDateFormats = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

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
  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
  { provide: MAT_DATE_FORMATS, useValue: dateFormats },
  { provide: LOCALE_ID, useValue: 'nl-NL' }
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
    LoginComponent,
    ProgrammaVersturenComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    AppRoutingModule,
    MatNativeDateModule
  ],
  providers: [providers],
  bootstrap: [AppComponent]
})
export class AppModule {}
