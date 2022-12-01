import {Component, OnInit, ViewChild} from '@angular/core';
import {Calendar, CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import {createEventId, INITIAL_EVENTS} from "../utils/event-utils";
import {CoursFormComponent} from "../cours-form/cours-form.component";
import {CoursService} from "../service/cours.service";
import {Validators} from "@angular/forms";
import {Cours} from "../modele/cours.modele";

@Component({
  providers: [CoursFormComponent],
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{

  @ViewChild('modalFormComponent', { static: true }) coursFormComponent!: CoursFormComponent;
  cours: Cours[]  = [];
  size!: number;

  courList!: any[];
  courEvents: EventInput[] = [];
  courModel!: EventInput;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      timeGridPlugin,
    ],
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    locale: 'fr',
    hiddenDays: [0],
    allDaySlot: false,
    dayHeaderFormat: { weekday: 'long' },
    slotMinTime: "08:00:00",
    slotMaxTime: "19:00:00",
    slotDuration: '01:00:00',
    expandRows: true,
    initialView: 'timeGridWeek',
    weekends: true,
    weekNumbers: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  courEventsApi: EventApi[] = [];

  constructor(private cs: CoursService) {
  }

  ngOnInit(): void {
    const n = this.cs.findAll().subscribe(maliste => {this.cours = maliste; this.size = maliste.length;});

    const convert = this.cs.findAll().subscribe((result: any) => {
      const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
      for (let i = 0; i < result.length; i++) {
        this.courModel = {
          id: result[i].idCours.toString(),
          title: result[i].nomCour,
          start: result[i].heure_debut,
          end: result[i].heure_fin
        };
        this.courEvents.push(this.courModel);
      }
    },error => {},() => {
      if(this.courEvents.length>0){
        this.calendarOptions.events =  this.courEvents;
      }
    });
  }

  calendarVisible = true;

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  async handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    const responseFormAddCours = await this.coursFormComponent.openModal(selectInfo.startStr,selectInfo.endStr,selectInfo.start.getDay()).then(c => {
      return c;
    }).catch(reason => console.log(reason));
    calendarApi.unselect(); // clear date selection
    if (responseFormAddCours && (typeof responseFormAddCours)!= undefined) {
      calendarApi.addEvent({
        id: createEventId(),
        title: responseFormAddCours.nomCour,
        start: responseFormAddCours.heure_debut,
        end: responseFormAddCours.heure_fin
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.courEventsApi = events;
  }

}
