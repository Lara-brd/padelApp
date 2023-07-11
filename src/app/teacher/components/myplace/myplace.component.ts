import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MyCard } from 'src/app/shared/interfaces/teacher.interface';

@Component({
  selector: 'app-myplace',
  templateUrl: './myplace.component.html',
  styleUrls: ['./myplace.component.scss']
})
export class MyplaceComponent {

  // Iconos bola y archivos inyectados en constructor
  constructor(
    private matIconRegistry:MatIconRegistry,
    private domSanitizer:DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      'ball',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/ball.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'file',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/svg/file.svg')
    );


  }


  //Objetos que se renderizaran en targeta con un *ngFor

  myPlaceContent:MyCard[] = [
    {
      text:'Planificaciones',
      img:'file'
    },
    {
      text:'Ejercicios',
      img:'ball'
    },
  ]


}

