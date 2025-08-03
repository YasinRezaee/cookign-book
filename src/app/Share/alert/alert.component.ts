import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alert',
  imports: [MatSnackBarModule, MatIcon, MatIcon, CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { 
    message: string; 
    type: 'success' | 'error' | 'warning' | 'info' 
  }) {}
}
