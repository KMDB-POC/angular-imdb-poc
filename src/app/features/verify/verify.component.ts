import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { VerifyService } from './verify.service';
import { ApiResponse } from '@core/models/api-response.model';

@Component({
  selector: 'verify',
  templateUrl: './verify.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  host: {
    class: 'w-full',
  },
})
export default class VerifyComponent implements OnInit {
  verifyForm!: FormGroup;

  private verifyService = inject(VerifyService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.verifyForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      token: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      const { email, token } = this.verifyForm.value;
      if (email && token) {
        this.verifyService.verifyAccount({ email, token }).subscribe({
          next: (res) => {
            this.router.navigate(['/login']);
          },
        });
      } else {
        console.error('Form values are invalid.');
      }
    }
  }
}
