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
import { ApiResponse } from '@core/models/api-response.model';
import { AuthService } from '@core/services/auth.service';

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

  private loginService = inject(LoginService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

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
            const returnUrl =
              this.router.parseUrl(this.router.url).queryParams['returnUrl'] ||
              '/';
            this.router.navigate([returnUrl]);
          },
        });
      } else {
        console.error('Form values are invalid.');
      }
    }
  }

  loginWithGoogle() {
    const returnUrl =
      this.router.parseUrl(this.router.url).queryParams['returnUrl'] ||
      window.location.origin;
    window.location.href =
      environment.apiBaseUrl + '/auth/login/google?redirectUrl=' + returnUrl;
  }

  loginWithFacebook() {
    const returnUrl =
      this.router.parseUrl(this.router.url).queryParams['returnUrl'] ||
      window.location.origin;
    window.location.href =
      environment.apiBaseUrl + '/auth/login/facebook?redirectUrl=' + returnUrl;
  }
}
