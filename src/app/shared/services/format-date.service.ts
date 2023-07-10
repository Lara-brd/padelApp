import { Injectable } from '@angular/core';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {

  optionsTime = ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30',
  '13:00','13:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30','24:00','24:30']

  constructor() { }

  //Cambiar formato obtengo dia y hora para mostrar en pantalla
  formatData(date:string):[string, string]{
    //convierto fecha a objeto date para manipularla
    const newDate = this.stringToDate(date);
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();

    //Obtengo el formato día
    const resultDay = newDate.toLocaleDateString('en', { year:"numeric", month:"short", day:"numeric", weekday:"long"})

    //Obtengo el formato hora
    const resultTime = `${hours}:${minutes}`;
    return [resultDay, resultTime]
  }

  //Cambia string por formato Data
  stringToDate(dateString:string){
    return new Date(Date.parse(dateString));
  }


  changeDateSimbol(date:string){
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8,11)

    return `${year}-${month}-${day}`
  }






}
