import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  host: {
    class: 'w-full',
  },
})
export default class SignupComponent {
  constructor(private signupService: SignupService) {}

  private router = inject(Router);

  private formBuilder = inject(FormBuilder);

  signupForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      if (name && email && password) {
        this.signupService.signup({ name, email, password }).subscribe({
          next: (res) => {
            console.log('Signup successful', res);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Signup failed', error);
          },
        });
      } else {
        console.error('Form values are invalid.');
      }
    }
  }

  signupWithGoogle() {
    window.location.href =
      environment.apiBaseUrl +
      '/auth/register/google?redirectUrl=' +
      this.router.url;
  }

  signupWithFacebook() {
    window.location.href =
      environment.apiBaseUrl +
      '/auth/register/facebook?redirectUrl=' +
      this.router.url;
  }
}
