import { Component, OnInit } from '@angular/core';
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
export class CalendarComponent implements OnInit{

  //Recoge el día seleccionado al clicar en el calendario
  selectedDay:string ='';

  //duration for snakbar
  durationInSeconds = 5;

  //Evento seleccionado al clicar sobre el en el calendario
  currentEvent!:EventTeacher;
  dataEvent:string = '';
  startTimeEvent:string = '';
  endTimeEvent:string =''

  //Abre el cuadro de diálogo al clicar el evento
  displayDialogEvent:boolean = false;

  //Abre el cuadro de diálogo con el formulario al clicar un día
  displayForm:boolean = false;

  events!:EventTeacher[];


  constructor ( private dataTeacherSvc: DataTeacherService, private formatDateSvc:FormatDateService, private _snackBar: MatSnackBar ){}

  ngOnInit(): void {
    //Recoge todos los eventos y los manda al calendario
    this.dataTeacherSvc.allEvents$.subscribe(data => {
      this.events = data;
    })
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
    eventBackgroundColor:'#8BC34A',
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

    //busca el evento seleccionado por id y extrae las fechas para mostrarlas en html
    const found = this.dataTeacherSvc.dataTeacher.eventsTeacher.find(({ id })=>id === info.event._def.publicId);
    if(found){
      this.currentEvent = found;
      const [day ,startTime] = this.formatDateSvc.formatData(this.currentEvent.start || '');
      const [ ,endTime] = this.formatDateSvc.formatData(this.currentEvent.end || '');
      this.dataEvent = day;
      this.startTimeEvent = startTime;
      this.endTimeEvent = endTime;
    };

    this.displayForm = false;
    this.onDisplayEvent();
  }


  //Comandos que se ejecutan al clicar sobre un dia del formulario
  handleDateClick(info:any) {
    //Al clicar en un día recojo la información
    this.selectedDay = this.formatDateSvc.changeDateSimbol(info.dateStr)  ;
    this. displayDialogEvent = false;
    this.onDisplayForm();
  }



  //__________________________________________________________


  //OPEN-CLOSE Dialog

  onDisplayForm(){
    this.displayForm = !this.displayForm;
  }

  onDisplayEvent(){
    this.displayDialogEvent = !this.displayDialogEvent;
  }



  //FOUND por id me busca el evento que he seleccionado
  teacherFound(info:any){
    const found = this.dataTeacherSvc.dataTeacher.eventsTeacher.find(({ id })=>id === info.event._def.publicId);
    if(found){
      //Recojo los datos del evento que el usuario selecciona
      this.currentEvent = found;
    };
  }

  //borra el evento que hemos abierto en diálogo y muestra un aviso
  onDeleteEvent(){
    this.dataTeacherSvc.deleteEventTeacher(this.currentEvent.id);
    this.dataTeacherSvc.newEventList();
    this.openSnackBar();
    this.onDisplayEvent()
  }


  //Aviso sobre evento borrado
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent , {
      duration: this.durationInSeconds * 1000,
    });

  }


  closeForm(){
    this.onDisplayForm();
  }













}
