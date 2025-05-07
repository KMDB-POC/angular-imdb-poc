import { ApplicationConfig, importProvidersFrom } from '@angular/core';
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
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { SupabaseApiInterceptor } from './core/interceptors/supabase-api.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    ApiInterceptor,
    SupabaseApiInterceptor,
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
    importProvidersFrom(SharedModule),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      },
    },
  ],
};
