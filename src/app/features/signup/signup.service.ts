import { Injectable, inject } from '@angular/core';
import { SignupRequest } from './signup.model';
import { BackendApiService } from '@core/services/backend-api.service';
import { Observable } from 'rxjs';
import { EncryptionUtils } from '@core/utils/encryption.utils';

@Injectable({ providedIn: 'root' })
export class SignupService {
  constructor(
    private backendApi: BackendApiService,
    private encryptionUtils: EncryptionUtils
  ) {}

  signup(request: SignupRequest): Observable<any> {
    const secureRequest = {
      ...request,
      password: this.encryptionUtils.safeEncrypt(request.password),
    };

    return this.backendApi.post(`/auth/register`, secureRequest);
  }
}
