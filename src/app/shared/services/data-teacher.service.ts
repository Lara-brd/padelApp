import { Injectable } from '@angular/core';
import { EventTeacher, Teacher } from '../interfaces/teacher.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTeacherService {


  //DUMMY DATA --> datos de rellenos reemplazar por información de base de datos
  //TODO --> cambiar dummy data por api

  private _dataTeacher:Teacher = {
    //datos del profesor
    name:'Paula',
    email:'paula@test.com',
    gender:'f',
    image:'../../../assets/images/eva-sm.jpg',
    alt:'fotogrfía profesor',
    //Events --> eventos para el calendario del profesor
    eventsTeacher : [
      {
        id:'E1',
        title: 'Paco Saez',
        start:  '2023-07-06T14:30:00',
        end:  '2023-07-06T15:30:00',
        allDay: false,
        description:"Descripción del evento (opcional)"

      },
      {
        id:'E2',
        title:'Mireia Castillo',
        start:  '2023-07-08T14:30',
        end:  '2023-07-08T16:30',
        allDay:false,
      },
      {
        id:'E3',
        title:"Carla Ricard",
        start:  '2023-07-01T14:30:00',
        end:    '2023-07-02T16:30:00',
        allDay: false,
        description:"Descripción del evento (opcional)"
      },
      {
        id:'E4',
        title:"Jordi Vicens",
        start:  '2023-07-13T14:30:00',
        end:  '2023-07-13T16:30:00',
        allDay: false,
        description:"Descripción del evento (opcional)"
      },
    ]
  }

  //EVENTS$_______________________________________

  //Observable events, GET -->Permite recibir información de los nuevos eventos a instante | SETEVENT --> nos permite establecer nuevos eventos desde cualquier componente.

  private events$ = new BehaviorSubject<EventTeacher[]>(this._dataTeacher.eventsTeacher);

  get allEvents$():Observable<EventTeacher[]>{
    return this.events$.asObservable();
  }

  //Actualiza la lista de eventos en el observable tanto al borrar como al añadir eventos
  newEventList(){
    this.events$.next([...this._dataTeacher.eventsTeacher])
  }



  //______________________________________________

  //Emite información no editable
  get dataTeacher (){
    return this._dataTeacher;
  }

  //Borrar elementos del array de eventos
  deleteEventTeacher(eventId:string){
    const newEvents = this._dataTeacher.eventsTeacher.filter(el => {
      return el.id !== eventId;
    })
    this._dataTeacher.eventsTeacher = newEvents;
  }


  //Añadiendo nuevo evento desde el formulario
  addEventFromForm(event:EventTeacher){
    this._dataTeacher.eventsTeacher.push(event);
    console.log('from service', this._dataTeacher)
  }

}
