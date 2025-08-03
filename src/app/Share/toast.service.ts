import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from './alert/alert.component';

type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  private show(message: string, type: ToastType = 'info') {
    this.snackBar.openFromComponent(AlertComponent, {
      data: { message, type },
      duration: 3000, // Auto-close after 5 seconds
      panelClass: [`toast-${type}`],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  info(message: string) {
    this.show(message, 'info');
  }
}