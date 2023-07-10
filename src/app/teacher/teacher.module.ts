import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTeacherComponent } from './home-teacher/home-teacher.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { MaterialModule } from '../shared/material/material.module';
import { ComponentsComponent } from './components/components.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { FormEventComponent } from './components/form-event/form-event.component';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    HomeTeacherComponent,
    CalendarComponent,
    TeacherProfileComponent,
    ComponentsComponent,
    SnackbarComponent,
    FormEventComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    ReactiveFormsModule

  ],
  exports:[
    HomeTeacherComponent
  ]
})
export class TeacherModule { }
