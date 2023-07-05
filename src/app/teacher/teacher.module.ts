import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';




@NgModule({
  declarations: [
    HomeTeacherComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  exports:[
    HomeTeacherComponent
  ]
})
export class TeacherModule { }
