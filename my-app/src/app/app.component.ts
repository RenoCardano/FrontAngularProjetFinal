import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { INITIAL_EVENTS, createEventId } from './utils/event-utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit, OnDestroy{
  secondes: any;
  counterSubscription! : Subscription

 constructor() {
 }

 ngOnInit(){
   const counter = interval(1000);
   this.counterSubscription = counter.subscribe(
     (value: number) => {
       this.secondes = value;
     }
   )
 }
  //elle detruit la souscription pour eviter les appel infini
  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe()
  }
 }

