import { NgModule } from '@angular/core';
import 'bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppareilComponent } from './appareil/appareil.component';
import {AppareilService} from "./service/appareil.service";
import { HostComponent } from './Auth/host.component';
import { ViewComponent } from './view/view.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthService} from "./service/auth.service";
import { SingleappareilComponent } from './singleappareil/singleappareil.component';
import { ClientComponent } from './client/client.component';
import { ClientsComponent } from './clients/clients.component';

import { FourOFourComponent } from './four-o-four/four-o-four.component';
import {AuthGard} from "./service/auth-guard.service";
import { EditAppareilComponent } from './edit-appareil/edit-appareil.component';
import { UserListComponent } from './user-list/user-list.component';
import {UserService} from "./service/user.service";
import { NewUserComponent } from './new-user/new-user.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ClientService} from "./service/client.service";
import {FullCalendarModule} from "@fullcalendar/angular";
import { CalendarComponent } from './calendar/calendar.component';
import { CoursFormComponent } from './cours-form/cours-form.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const appRoute : Routes = [
  {path: 'auth',  component: HostComponent },
  {path: 'plannings', component: CalendarComponent},
  {path: 'appareils', canActivate : [AuthGard] , component: ViewComponent},
  {path: 'appareils/:id', canActivate : [AuthGard] , component: SingleappareilComponent },
  {path: 'users', canActivate : [AuthGard] , component: UserListComponent },
  {path: 'newusers', canActivate : [AuthGard] , component: NewUserComponent },
  {path: 'edit', canActivate : [AuthGard] , component: EditAppareilComponent },
  {path: 'clients', canActivate : [AuthGard] , component: ClientsComponent },
  {path: '', canActivate : [AuthGard] , component: ViewComponent},
  {path: 'not-found',  component: FourOFourComponent},
  {path: '**', redirectTo: '/not-found'}
]
@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    HostComponent,
    ViewComponent,
    SingleappareilComponent,
    ClientComponent,
    ClientsComponent,
    FourOFourComponent,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent,
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
    ClientService,
    AuthService,
    AuthGard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
