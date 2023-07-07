import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({

  imports: [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  exports:[
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule
  ]

})
export class MaterialModule { }
