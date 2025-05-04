import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  host: {
    class: 'w-full',
  },
})
export default class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email && password) {
        this.loginService.login({ email, password }).subscribe({
          next: (res) => {
            console.log('Login successful', res);
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Login failed', error);
          },
        });
      } else {
        console.error('Form values are invalid.');
      }
    }
  }

  loginWithGoogle() {
    window.location.href =
      environment.apiBaseUrl +
      '/auth/login/google?redirectUrl=' +
      this.router.url;
  }

  loginWithFacebook() {
    window.location.href =
      environment.apiBaseUrl +
      '/auth/login/facebook?redirectUrl=' +
      this.router.url;
  }
}
