import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private snackBar: MatSnackBar) {}

  showError(message: string, duration: number = 3000, action: string = 'Close'): void {
    this.showNotification(message, 'error-snackbar', duration, action);
  }

  showSuccess(message: string, duration: number = 3000, action: string = 'Close'): void {
    this.showNotification(message, 'success-snackbar', duration, action);
  }

  showMessage(message: string, duration: number = 3000, action: string = 'Close'): void {
    this.showNotification(message, '', duration, action);
  }

  private showNotification(message: string, panelClass: string, duration: number, action: string): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: [panelClass]
    });
  }
}
