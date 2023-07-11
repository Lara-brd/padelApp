import { Component } from '@angular/core';
import { MyCard } from 'src/app/shared/interfaces/teacher.interface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {

  //Objetos que se renderizarán como targeta --> la imagen es el nombre de una clase con el background-image corresondiente a cada targeta
  cardContent:MyCard[] = [
    {
      text:'VideoLibro de AulaPadel',
      img:'card-one',
    },
    {
      text:'Publicaciones de AulaPadel',
      img:'card-two',
    },
  ]




}
