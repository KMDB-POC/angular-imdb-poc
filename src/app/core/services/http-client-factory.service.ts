import { Injectable, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpBackend,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { ApiInterceptor } from '@core/interceptors/api.interceptor';
import { SupabaseApiInterceptor } from '@core/interceptors/supabase-api.interceptor';
import { Observable } from 'rxjs';

export const BACKEND_HTTP_CLIENT = new InjectionToken<HttpClient>(
  'BackendHttpClient'
);
export const SUPABASE_HTTP_CLIENT = new InjectionToken<HttpClient>(
  'SupabaseHttpClient'
);

class InterceptingHandler implements HttpHandler {
  constructor(private interceptor: HttpHandler) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.handle(req);
  }
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientFactoryService {
  constructor(
    private httpBackend: HttpBackend,
    private apiInterceptor: ApiInterceptor,
    private supabaseApiInterceptor: SupabaseApiInterceptor
  ) {}

  createHttpClient(type: 'backend' | 'supabase'): HttpClient {
    switch (type) {
      case 'backend':
        const backendInterceptor = {
          handle: (req: HttpRequest<any>) => {
            return this.apiInterceptor.intercept(req, this.httpBackend);
          },
        };
        const backendHandler = new InterceptingHandler(backendInterceptor);
        return new HttpClient(backendHandler);

      case 'supabase':
        const supabaseInterceptor = {
          handle: (req: HttpRequest<any>) => {
            return this.supabaseApiInterceptor.intercept(req, this.httpBackend);
          },
        };
        const supabaseHandler = new InterceptingHandler(supabaseInterceptor);
        return new HttpClient(supabaseHandler);

      default:
        throw new Error('Invalid HTTP client type');
    }
  }
}
