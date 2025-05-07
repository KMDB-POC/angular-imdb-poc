import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@core/models/api-response.model';
import { environment } from '@environments/environment';
import { VerifyRequest } from './verify.model';
import { BackendApiService } from '@core/services/backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyService {
  private backendApi = inject(BackendApiService);

  verifyAccount(verifyData: VerifyRequest) {
    return this.backendApi.post('/auth/verify-email', verifyData);
  }
}
