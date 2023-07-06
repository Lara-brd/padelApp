import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {

  constructor() { }


  //Cambiar formato obtengo dia y hora para mostrar en pantalla
  formatData(date:string):[string, string]{
    //convierto fecha a objeto date para manipularla
    const newDate = new Date(Date.parse(date));
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();

    //Obtengo el formato día
    const resultDay = newDate.toLocaleDateString('en', { year:"numeric", month:"short", day:"numeric", weekday:"long"})

    //Obtengo el formato hora
    const resultTime = `${hours}:${minutes}`;

    return [resultDay, resultTime]
  }




}
