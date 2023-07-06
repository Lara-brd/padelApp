import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';




@NgModule({
  declarations: [
    HomeTeacherComponent,
    CalendarComponent,
    TeacherProfileComponent
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
