import { Injectable, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpBackend,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { apiInterceptor } from '@core/interceptors/api.interceptor';
import { supabaseApiInterceptor } from '@core/interceptors/supabase-api.interceptor';

export const BACKEND_HTTP_CLIENT = new InjectionToken<HttpClient>(
  'BackendHttpClient'
);
export const SUPABASE_HTTP_CLIENT = new InjectionToken<HttpClient>(
  'SupabaseHttpClient'
);

class InterceptedHandler implements HttpHandler {
  constructor(
    private backend: HttpBackend,
    private interceptor: (req: HttpRequest<any>, next: HttpHandler) => any
  ) {}

  handle(req: HttpRequest<any>) {
    return this.interceptor(req, this.backend);
  }
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientFactoryService {
  constructor(private httpBackend: HttpBackend) {}

  createHttpClient(type: 'backend' | 'supabase'): HttpClient {
    switch (type) {
      case 'backend':
        const backendHandler = new InterceptedHandler(
          this.httpBackend,
          (req, next) => apiInterceptor(req, next.handle.bind(next))
        );
        return new HttpClient(backendHandler);

      case 'supabase':
        const supabaseHandler = new InterceptedHandler(
          this.httpBackend,
          (req, next) => supabaseApiInterceptor(req, next.handle.bind(next))
        );
        return new HttpClient(supabaseHandler);

      default:
        throw new Error('Invalid HTTP client type');
    }
  }
}
