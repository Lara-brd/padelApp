import { Injectable } from '@angular/core';
import { Teacher } from '../interfaces/teacher.interface';

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
    image:'',
    //Events --> eventos para el calendario del profesor
    eventsTeacher : [
      {
        id:'E1',
        title: 'Paco Saez',
        start:  '2023-07-06T14:30:00',
        allDay: false,
        textColor:'pink'
      },
      {
        id:'E2',
        title:'Mireia Castillo',
        start:  '2023-07-08T14:30:00',
        allDay:false,
      },
      {
        id:'E3',
        title:"Evento 2",
        start:  '2023-07-01T14:30:00',
        end:  '2023-07-02T16:30:00',
        allDay: false,
        description:"DEscripción del evento"
      },
    ]
  }


  get dataTeacher (){
    return this._dataTeacher;
  }

}
