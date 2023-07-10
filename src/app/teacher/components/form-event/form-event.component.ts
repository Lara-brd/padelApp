import { DataTeacherService } from 'src/app/shared/services/data-teacher.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormatDateOptions } from '@fullcalendar/core';
import { EventTeacher } from 'src/app/shared/interfaces/teacher.interface';
import { FormatDateService } from 'src/app/shared/services/format-date.service';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})

export class FormEventComponent {


  @Input() selectedDay!:string;

  // Recoge la fecha seleccionada clicando sobre el calendario y la cambia de formato
  get selectedDayFormat (){
    const [day] = this.formatSvc.formatData(this.selectedDay);
    return day;
  }

  constructor( private fb: FormBuilder, private formatSvc:FormatDateService, private dataTeacherSvc:DataTeacherService ){}

  get optionsTime():string[] {
    return this.formatSvc.optionsTime;
  }

  //Valores del formulario - validaciones
  public myForm:FormGroup = this.fb.group({
    eventname: ['', [Validators.required, Validators.minLength(3)]],
    starttime: ['09:00'],
    endtime: ['10:00'],

  })

  // Recojo el mensaje de error que manda el formulario para mostrarlo en el html
  getFieldError(field:string):string | null {

    if(!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    //forof --> con forof saca las llaves que vienen en esos objetos errores
    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
        return 'Este campo es requerido';
        case 'minlength':
        return `Mínimo ${ errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return null;
  }


  //Guarda evento creado por el profesor en el formulario
  onSave(){
    if(this.myForm.invalid)return;

    //TODO mejorar la creación de id
    const idnumber :number = this.dataTeacherSvc.dataTeacher.eventsTeacher.length + 1;
    this.selectedDay = this.formatSvc.changeDateSimbol(this.selectedDay);

    //TODO añadir descripcion
    const newEvent:EventTeacher = {
      id:`E${idnumber}`,
      title:this.myForm.controls['eventname'].value,
      allDay:false,
      startTime:`${this.selectedDay}T${this.myForm.controls['starttime'].value}:00`,
      endTime: `${this.selectedDay}T${ this.myForm.controls['endtime'].value}:00`  ,
    }

    this.dataTeacherSvc.addEventFromForm(newEvent)

    console.log(newEvent)


  }

}
