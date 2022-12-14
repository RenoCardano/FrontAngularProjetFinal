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
      for (let i = 0; i < result.length; i++) {
        console.log(result[i].enseignement.matiereEnseignee.couleur);
        this.courModel = {
          id: result[i].idCours.toString(),
          title: CoursFormComponent.coursToString(result[i]),
          start: result[i].heure_debut,
          end: result[i].heure_fin,
          color: result[i].enseignement.matiereEnseignee.couleur,
          description: CoursFormComponent.coursToString(result[i])
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
    const responseFormAddCours = await this.coursFormComponent.openModal(selectInfo.startStr,selectInfo.endStr,selectInfo.start.getDay(),null,function(){}).then(c => {
      return c;
    }).catch(reason => console.log(reason));
    calendarApi.unselect(); // clear date selection
    if (responseFormAddCours && (typeof responseFormAddCours)!= undefined) {
      calendarApi.addEvent({
        id: ""+responseFormAddCours.idCours,
        title: CoursFormComponent.coursToString(responseFormAddCours),
        start: responseFormAddCours.heure_debut,
        end: responseFormAddCours.heure_fin,
        color: responseFormAddCours.enseignement.matiereEnseignee.couleur,
        description: CoursFormComponent.coursToString(responseFormAddCours)
      });
    }
  }

  async handleDateUpdate(clickInfo: EventClickArg, cours: Cours) {
    const calendarApi = clickInfo.view.calendar;
    // @ts-ignore
    const responseFormAddCours = await this.coursFormComponent.openModal(cours.heure_debut,cours.heure_fin,cours.jourCours.idJour,(cours as Cours),()=>(clickInfo.event.remove())).then(c => {
      return c;
    }).catch(reason => console.log(reason));
    calendarApi.unselect(); // clear date selection
    if (responseFormAddCours) {
      let id = clickInfo.event.id;
      calendarApi.addEvent({
        id: ""+responseFormAddCours.idCours,
        title: CoursFormComponent.coursToString(responseFormAddCours),
        start: responseFormAddCours.heure_debut,
        end: responseFormAddCours.heure_fin,
        color: responseFormAddCours.enseignement.matiereEnseignee.couleur,
        description: CoursFormComponent.coursToString(responseFormAddCours)
      });
      window.location.reload();
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
      this.handleDateUpdate(clickInfo, (this.cours.find(v => ""+v.idCours == clickInfo.event.id) as Cours))
    }

  handleEvents(events: EventApi[]) {
    this.courEventsApi = events;
  }

}
