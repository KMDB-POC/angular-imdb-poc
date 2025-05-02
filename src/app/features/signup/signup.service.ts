import { Injectable, inject } from '@angular/core';
import { SignupRequest } from './signup.model';
import { BackendApiService } from '@core/services/backend-api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private backendApi = inject(BackendApiService);

  signup(request: SignupRequest): Observable<any> {
    return this.backendApi.post(`/auth/register`, request);
  }
}
