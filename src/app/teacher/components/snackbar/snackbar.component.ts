import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styles: [`

    .wrapp-snakcbar{
      display:flex;
      padding:50px;
    }
  `]
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

}
