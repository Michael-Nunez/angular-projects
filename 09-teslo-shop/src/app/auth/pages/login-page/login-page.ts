import { AuthService } from '@/auth/services/auth.services';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  hasErrors = signal(false);
  isPosting = signal(false);

  authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasErrors.set(true);

      setTimeout(() => {
        this.hasErrors.set(false);
      }, 2_000);

      return;
    }

    const { email = '', password = ''} = this.loginForm.value;
    this.authService
      .login(email!, password!)
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/');
          return;
        }

        this.hasErrors.set(true);

        setTimeout(() => {
        this.hasErrors.set(false);
      }, 2_000);
      });
  }
}