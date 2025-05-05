import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BACKEND_HTTP_CLIENT } from './http-client-factory.service';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { PaginatedResponse } from '../models/paginated-response.model';
import { SKIP_ERROR_HANDLER_HEADER } from '@core/interceptors/api.interceptor';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  constructor(@Inject(BACKEND_HTTP_CLIENT) private http: HttpClient) {}

  get<T>(endpoint: string, params?: any, headers?: HttpHeaders): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<T>(endpoint, { params: httpParams, headers });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(endpoint, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(endpoint, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(endpoint);
  }

  createSkipErrorHandlerHeaders(): HttpHeaders {
    return new HttpHeaders().set(SKIP_ERROR_HANDLER_HEADER, '');
  }
}
