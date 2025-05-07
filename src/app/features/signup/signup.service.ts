import { Injectable, inject } from '@angular/core';
import { SignupRequest } from './signup.model';
import { BackendApiService } from '@core/services/backend-api.service';
import { Observable } from 'rxjs';
import { EncryptionUtils } from '@core/utils/encryption.utils';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private backendApi = inject(BackendApiService);
  private encryptionUtils = inject(EncryptionUtils);

  signup(request: SignupRequest): Observable<any> {
    const secureRequest = {
      ...request,
      password: this.encryptionUtils.safeEncrypt(request.password),
    };

    return this.backendApi.post(`/auth/register`, secureRequest);
  }
}
