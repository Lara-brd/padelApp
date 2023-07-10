import { Component, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPluguin from '@fullcalendar/interaction';
import { DataTeacherService } from 'src/app/shared/services/data-teacher.service';
import { EventTeacher, Teacher } from 'src/app/shared/interfaces/teacher.interface';
import { FormatDateService } from 'src/app/shared/services/format-date.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  //Recoge el día seleccionado al clicar en el calendario
  selectedDay:string ='';

  //duration for snakbar
  durationInSeconds = 5;

  //Evento seleccionado al clicar sobre el en el calendario
  currentEvent!:EventTeacher;

  //Abre el cuadro de diálogo al clicar el evento
  displayDialogEvent:boolean = false;

  //Abre el cuadro de diálogo con el formulario al clicar un día
  displayForm:boolean = false;


  constructor ( private dataTeacherSvc: DataTeacherService, private formatDateSvc:FormatDateService, private _snackBar: MatSnackBar ){}


  //recoge el array de todos los eventos del usuario
  get events(){
    return this.dataTeacherSvc.dataTeacher.eventsTeacher;
  }




  //OPCIONES del calendario
  //_______________________________________

  calendarOptions: CalendarOptions = {

    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPluguin],
    selectable: true,
    editable:true,
    unselectAuto :true,
    eventColor: '#8BC34A',
    eventBackgroundColor:'#223187',
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
    //eventclick --> si clicamos sobre un evento nos manda los datos y nos permite hacer algo con bind llamamos la función eventClickFunction
    eventClick: this.eventClickFunction.bind(this),
    //al clicar sobre cualquier casilla nos manda la info de la fecha además de otras cosas.
    dateClick: this.handleDateClick.bind(this), // bind is important!

  }
  //End calendarOptions
  //_________________________________________


  //Comandos que se ejecutn al clicar sobre un evento
  eventClickFunction(info:any){
    // alert('Event: ' + info.event.title)
    // alert('Coordinates: ' + info.jsEvent.screenX  + ',' + info.jsEvent.pageY);
    this.onCloseEvent();
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


  //Comandos que se ejecutn al clicar sobre un evento
  handleDateClick(info:any) {
    //Al clicar en un día recojo la información

    this.selectedDay = this.formatDateSvc.changeDateSimbol(info.dateStr)  ;
    console.log(this.selectedDay)
    // console.log(this.selectedDay)

    // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    // change the day's background color just for fun
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

  //Respuesta sobre la fecha del evento
  schedule(){
    if(this.currentEvent.startDay === this.currentEvent.endDay ){
      return `
      ${this.currentEvent.startDay} ${this.currentEvent.startTime} - ${this.currentEvent.endTime}`
    }
    return `
    ${this.currentEvent.startDay} ${this.currentEvent.startTime}
      -
    ${this.currentEvent.endDay} ${this.currentEvent.endTime}`
  }

  //Cierra dialogo donde se muestra la información del evento seleccionado
  onCloseEvent(){
    this.displayDialogEvent = !this.displayDialogEvent;
  }

  //borra el evento que hemos abierto en diálogo y muestra un aviso
  onDeleteEvent(){
    this.dataTeacherSvc.deleteEventTeacher(this.currentEvent.id);
    this.openSnackBar();
    this.onCloseEvent();
  }

  // TODO ediar evento
  // onEditEvent(){
  //   this.dataTeacherSvc.editEventTeacher(this.currentEvent.id);
  // }





  //Aviso sobre evento borrado
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent , {
      duration: this.durationInSeconds * 1000,
    });


  }













}
