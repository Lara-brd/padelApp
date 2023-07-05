import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPluguin from '@fullcalendar/interaction';
import { DataTeacherService } from 'src/app/shared/services/data-teacher.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  foo = 'hoaoaala'

  constructor ( private dataTeacherSvc: DataTeacherService){}

  //Array de eventos del usuario
  get events(){
    return this.dataTeacherSvc.dataTeacher.eventsTeacher;
  }


  //OPCIONES del calendario
  //_______________________________________

  calendarOptions: CalendarOptions = {

    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPluguin],
    locale:'es',//language
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
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    //eventclick --> is clicamos sobre un evento nos manda los datos y nos permite hacer algo
    eventClick: this.eventClickFunction.bind(this),
    //al clicar sobre cualquier casilla nos manda la info de la fecha además de otras cosas.
    dateClick: this.handleDateClick.bind(this), // bind is important!

  }
  //End calendarOptions
  //_________________________________________


  eventClickFunction(info:any){
    alert('Event: ' + info.event.title);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('View: ' + info.view.type);
    console.log(info.event.description)
    // change the border color just for fun
    info.el.style.borderColor = 'red';

  }

  handleDateClick(info:any) {
    alert('Clicked on: ' + info.dateStr);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('Current view: ' + info.view.type);
    // change the day's background color just for fun
    info.dayEl.style.backgroundColor = 'red';
    console.log('hola')
  }











}
