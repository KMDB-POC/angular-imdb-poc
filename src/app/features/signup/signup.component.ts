import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.development';
import { CustomSnackbarService } from '@shared/components/custom-snackbar/custom-snackbar.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  host: {
    class: 'w-full',
  },
})
export default class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private snackBar: CustomSnackbarService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      if (name && email && password) {
        this.signupService.signup({ name, email, password }).subscribe({
          next: (res) => {
            this.snackBar.openSnackBar(
              'Signup successful! Please check your email to verify your account.',
              'success'
            );
            this.router.navigate(['/verify']);
          },
        });
      } else {
        this.snackBar.openSnackBar('Form values are invalid.', 'error');
      }
    }
  }

  signupWithGoogle() {
    window.location.href =
      environment.apiBaseUrl +
      '/auth/login/google?redirectUrl=' +
      this.router.url;
  }

  signupWithFacebook() {
    window.location.href =
      environment.apiBaseUrl +
      '/auth/login/facebook?redirectUrl=' +
      this.router.url;
  }
}
