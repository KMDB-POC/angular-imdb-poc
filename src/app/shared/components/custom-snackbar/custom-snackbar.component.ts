import { Component, inject, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export interface SnackbarData {
  message: string;
  icon: string;
  type: 'error' | 'success' | 'info';
}

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css'],
})
export class CustomSnackbarComponent {
  data = inject<SnackbarData>(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef<CustomSnackbarComponent>);
}
