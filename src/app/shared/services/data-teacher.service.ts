import { Injectable } from '@angular/core';
import { EventTeacher, Teacher } from '../interfaces/teacher.interface';

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
        end:  '2023-07-06T15:30:00',
        allDay: false,
        textColor:'pink',
        description:"DEscripción del evento"

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
        title:"carla aacaba",
        start:  '2023-07-01T14:30:00',
        end:    '2023-07-02T16:30:00',
        allDay: false,
        description:"DEscripción del evento"
      },
      {
        id:'E4',
        title:"Janan el pesao",
        start:  '2023-07-13T14:30:00',
        allDay: true,
        description:"DEscripción del evento"
      },

    ]
  }


  get dataTeacher (){
    return this._dataTeacher;
  }

}
