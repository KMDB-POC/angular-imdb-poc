import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  HttpBackend,
  HttpClient,
} from '@angular/common/http';
import {
  HttpClientFactoryService,
  BACKEND_HTTP_CLIENT,
  SUPABASE_HTTP_CLIENT,
} from './core/services/http-client-factory.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: BACKEND_HTTP_CLIENT,
      useFactory: (factory: HttpClientFactoryService) =>
        factory.createHttpClient('backend'),
      deps: [HttpClientFactoryService],
    },
    {
      provide: SUPABASE_HTTP_CLIENT,
      useFactory: (factory: HttpClientFactoryService) =>
        factory.createHttpClient('supabase'),
      deps: [HttpClientFactoryService],
    },
    provideAnimationsAsync(),
  ],
};
