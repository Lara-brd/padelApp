import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPluguin from '@fullcalendar/interaction';
import { DataTeacherService } from 'src/app/shared/services/data-teacher.service';
import { EventTeacher, Teacher } from 'src/app/shared/interfaces/teacher.interface';
import { FormatDateService } from 'src/app/shared/services/format-date.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  currentEvent!:EventTeacher;

  displayDialog:boolean = false;

  title!:string;


  constructor ( private dataTeacherSvc: DataTeacherService, private formatDateSvc:FormatDateService ){}

  //Array de eventos del usuario
  get events(){
    return this.dataTeacherSvc.dataTeacher.eventsTeacher;
  }

  //Recoge el evento seleccionado por el usuario
  currentEventTeacher!:Teacher;


  //OPCIONES del calendario
  //_______________________________________

  calendarOptions: CalendarOptions = {

    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPluguin],
    selectable: true,
    editable:true,
    unselectAuto :true,
    eventColor: '#378006',
    eventBackgroundColor:'pink',
    contentHeight: 800,
    //como mostrará la hora:
    eventTimeFormat: { // like '14:30'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    },
    //header toolbar nos permite elegir si queremos la vista més semana o día
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    //eventclick --> is clicamos sobre un evento nos manda los datos y nos permite hacer algo
    eventClick: this.eventClickFunction.bind(this),
    //al clicar sobre cualquier casilla nos manda la info de la fecha además de otras cosas.
    dateClick: this.handleDateClick.bind(this), // bind is important!

  }
  //End calendarOptions
  //_________________________________________



  eventClickFunction(info:any){
    // alert('Event: ' + info.event.title)
    // alert('Coordinates: ' + info.jsEvent.screenX  + ',' + info.jsEvent.pageY);
    this.displayDialog = !this.displayDialog;
    //buscando el evento por id en los datos del servicci
    const found = this.dataTeacherSvc.dataTeacher.eventsTeacher.find(({ id })=>id === info.event._def.publicId);
    if(found){
      this.currentEvent = found;
      const [dia, hora] = this.formatDateSvc.formatData(this.currentEvent.start || '');
      this.currentEvent = {...this.currentEvent, startDay:dia, startTime:hora};
      if(this.currentEvent.end){
        const [dia, hora] = this.formatDateSvc.formatData(this.currentEvent.end || '');
        this.currentEvent = { ...this.currentEvent, endDay:dia, endTime:hora}
      }
    };

    // change the border color just for fun
    info.el.style.borderColor = 'red';

  }

  handleDateClick(info:any) {
    // alert('Clicked on: ' + info.dateStr);
    // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    // alert('Current view: ' + info.view.type);
    // this.title = info.event.title;
    // // change the day's background color just for fun
    // info.dayEl.style.backgroundColor = 'red';

  }



  //__________________________________________________________



  //FOUND por id me busca el evento que he seleccionado
  teacherFound(info:any){
    const found = this.dataTeacherSvc.dataTeacher.eventsTeacher.find(({ id })=>id === info.event._def.publicId);
    if(found){
      //Recojo los datos del evento que el usuario selecciona
      this.currentEvent = found;



    };
  }

  schedule(){
    if(this.currentEvent.startDay === this.currentEvent.endDay ){
      return `${this.currentEvent.startDay} ${this.currentEvent.startTime} - ${this.currentEvent.endTime}`
    }
    return `
    ${this.currentEvent.startDay} ${this.currentEvent.startTime}
      -
    ${this.currentEvent.endDay} ${this.currentEvent.endTime}
    `
  }










}
