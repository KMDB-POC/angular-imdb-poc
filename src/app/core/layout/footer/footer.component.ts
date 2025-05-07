import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseFunctionsService } from '@core/services/supabase-functions.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FooterComponent implements OnInit {
  subscribeForm!: FormGroup;
  isLoading = false;
  subscriptionMessage = '';
  subscriptionSuccess = false;
  currentYear = new Date().getFullYear();

  private formBuilder = inject(FormBuilder);
  private supabaseFunctions = inject(SupabaseFunctionsService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.subscribeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubscribe(): void {
    if (this.subscribeForm.invalid) {
      return;
    }

    const { email } = this.subscribeForm.value;
    this.isLoading = true;
    this.subscriptionMessage = '';

    this.supabaseFunctions.subscribeEmail(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.subscriptionSuccess = true;
        this.subscriptionMessage =
          'You have successfully subscribed to movie updates!';
        this.subscribeForm.reset();
      },
      error: (error) => {
        this.isLoading = false;
        this.subscriptionSuccess = false;
        this.subscriptionMessage =
          'Failed to subscribe. Please try again later.';
        console.error('Subscription error:', error);
      },
    });
  }
}
