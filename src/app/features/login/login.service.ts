import { Injectable, inject } from '@angular/core';
import { LoginRequest } from './login.model';
import { BackendApiService } from '@core/services/backend-api.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private backendApi = inject(BackendApiService);

  login(request: LoginRequest) {
    return this.backendApi.post(`/auth/login`, request);
  }
}
