import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable()
export class SupabaseApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${environment.supabaseBaseUrl}${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${environment.supabaseAccessToken}`,
      },
    });
    return next.handle(apiReq);
  }
}
