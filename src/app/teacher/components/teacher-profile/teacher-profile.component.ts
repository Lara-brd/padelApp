import { Component } from '@angular/core';
import { DataTeacherService } from 'src/app/shared/services/data-teacher.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent {

  constructor ( private dataTeacherSvc: DataTeacherService){}

  get teacher(){
    return this.dataTeacherSvc.dataTeacher
  }

}
