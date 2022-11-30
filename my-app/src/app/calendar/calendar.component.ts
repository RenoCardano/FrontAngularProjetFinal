import {Component, ViewChild} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import {createEventId, INITIAL_EVENTS} from "../utils/event-utils";
import {CalendarService} from "../service/calendar.service";
import {CoursFormComponent} from "../cours-form/cours-form.component";

@Component({
  providers: [CoursFormComponent],
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  @ViewChild('modalFormComponent', { static: true }) coursFormComponent!: CoursFormComponent;

  constructor(private calendarService : CalendarService) {
  }

  calendarVisible = true;
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
    hiddenDays: [0],
    allDaySlot: false,
    dayHeaderFormat: { weekday: 'long' },
    slotMinTime: "08:00:00",
    slotMaxTime: "19:00:00",
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS,
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
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  async handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    const responseFormAddCours = await this.coursFormComponent.openModal().then(c => {
      return c;
    });

    calendarApi.unselect(); // clear date selection
    console.log("DEBUT " + selectInfo.startStr);
    console.log("END " + selectInfo.endStr);
    if (responseFormAddCours) {
      calendarApi.addEvent({
        id: createEventId(),
        title: responseFormAddCours.nomCour,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
