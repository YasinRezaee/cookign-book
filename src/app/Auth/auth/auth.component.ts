import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoadingService } from '../../Loading/loading.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode = signal<boolean>(true);
  errorMessage = signal<string | null>(null);
  
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private load: LoadingService,
    private router: Router,
  ) {
    // Try auto-login if token exists
    this.authService.autoLogin();
  }

  onLoginMood() {
    this.isLoginMode.update(mode => !mode);
    this.errorMessage.set(null); // Clear error when switching modes
  }

  onSubmitAuthForm() {
    // Early return if form is invalid
    if (!this.authForm.valid) {
      return;
    }

    this.load.show();
    this.errorMessage.set(null);

    const email = this.authForm.value.email!;
    const password = this.authForm.value.password!;

    let authObs: Observable<any>;

    if (this.isLoginMode()) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
        this.authForm.reset();
        this.load.hide();
      },
      error: (error) => {
        this.errorMessage.set(this.getErrorMessage(error));
        this.load.hide();
      }
    });
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error?.message) {
      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          return 'This email is already in use';
        case 'EMAIL_NOT_FOUND':
          return 'Email not found';
        case 'INVALID_PASSWORD':
          return 'Invalid password';
        case 'USER_DISABLED':
          return 'This account has been disabled';
        default:
          return 'Login failed. Please try again';
      }
    }
    return 'An unknown error occurred';
  }
}