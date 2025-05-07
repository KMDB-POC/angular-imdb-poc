import { Injectable, inject } from '@angular/core';
import { LoginRequest } from './login.model';
import { BackendApiService } from '@core/services/backend-api.service';
import { EncryptionUtils } from '@core/utils/encryption.utils';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private backendApi = inject(BackendApiService);
  private encryptionUtils = inject(EncryptionUtils);

  constructor() {}

  login(request: LoginRequest) {
    const secureRequest = {
      ...request,
      password: this.encryptionUtils.safeEncrypt(request.password),
    };

    return this.backendApi.post(`/auth/login`, secureRequest);
  }
}
