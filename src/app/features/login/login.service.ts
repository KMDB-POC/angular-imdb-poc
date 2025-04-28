import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from './login.model';
import { ApiResponse } from '@core/models/api-response.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  login(request: LoginRequest) {
    return this.http
      .post<ApiResponse<LoginResponse>>(`/auth/login`, request)
      .pipe(map((data) => data));
  }
}
