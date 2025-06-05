import { inject, Injectable, InjectionToken } from '@angular/core';
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

type HttpClientFactoryFn = () => HttpClient;

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
  private httpBackend = inject(HttpBackend);
  private apiInterceptor = inject(ApiInterceptor);
  private supabaseApiInterceptor = inject(SupabaseApiInterceptor);

  private clientFactories: Record<string, HttpClientFactoryFn> = {
    backend: () => {
      const backendInterceptor = {
        handle: (req: HttpRequest<any>) =>
          this.apiInterceptor.intercept(req, this.httpBackend),
      };
      const backendHandler = new InterceptingHandler(backendInterceptor);
      return new HttpClient(backendHandler);
    },
    supabase: () => {
      const supabaseInterceptor = {
        handle: (req: HttpRequest<any>) =>
          this.supabaseApiInterceptor.intercept(req, this.httpBackend),
      };
      const supabaseHandler = new InterceptingHandler(supabaseInterceptor);
      return new HttpClient(supabaseHandler);
    },
  };

  createHttpClient(type: string): HttpClient {
    const factory = this.clientFactories[type];
    if (!factory) {
      throw new Error('Invalid HTTP client type');
    }
    return factory();
  }
}
