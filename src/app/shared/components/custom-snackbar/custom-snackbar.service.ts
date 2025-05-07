import { inject, Injectable } from '@angular/core';
import { CustomSnackbarComponent } from './custom-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class CustomSnackbarService {
  private snackBar = inject(MatSnackBar);

  openSnackBar(message: string, type: 'error' | 'success' | 'info'): void {
    let icon: string;
    let panelClass: string;

    switch (type) {
      case 'error':
        icon = 'error';
        panelClass = 'error-snackbar';
        break;
      case 'success':
        icon = 'check_circle';
        panelClass = 'success-snackbar';
        break;
      case 'info':
      default:
        icon = 'info';
        panelClass = 'info-snackbar';
        break;
    }

    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message,
        icon,
        type,
      },
      panelClass: [panelClass],
    });
  }
}
