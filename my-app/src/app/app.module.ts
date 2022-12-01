import { NgModule } from '@angular/core';
import 'bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppareilService} from "./service/appareil.service";
import { HostComponent } from './Auth/host.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthService} from "./service/auth.service";

import { FourOFourComponent } from './four-o-four/four-o-four.component';
import {AuthGard} from "./service/auth-guard.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FullCalendarModule} from "@fullcalendar/angular";
import { CalendarComponent } from './calendar/calendar.component';
import { CoursFormComponent } from './cours-form/cours-form.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const appRoute : Routes = [
  {path: 'auth',  component: HostComponent },
  {path: 'plannings', component: CalendarComponent},
  {path: 'not-found',  component: FourOFourComponent},
  {path: '**', redirectTo: '/not-found'}
]
@NgModule({
  declarations: [
    AppComponent,
    HostComponent,
    FourOFourComponent,
    CalendarComponent,
    CoursFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        RouterModule.forRoot(appRoute),
        ReactiveFormsModule,
        HttpClientModule,
        FullCalendarModule,
        NgbModule
    ],
  providers: [
    AppareilService,
    HttpClientModule,
    HttpClient,
    AuthService,
    AuthGard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
