import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiResponse } from '@core/models/api-response.model';
import { CustomSnackbarService } from '@shared/components/custom-snackbar/custom-snackbar.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private snackBar: CustomSnackbarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${environment.apiBaseUrl}${req.url}`,
      withCredentials: true,
    });

    return next.handle(apiReq).pipe(
      tap((event: HttpEvent<ApiResponse<any>>) => {
        if (event.type === HttpEventType.Response) {
          console.log('Response:', event.body);
          if (event.body && event.body.statusCode >= 400) {
            const message =
              event.body.errors?.[0] ||
              'There was an error processing your request.';
            this.snackBar.openSnackBar(message, 'error');
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const message =
          error.error?.message ||
          error.message ||
          'There was an error processing your request.';
        this.snackBar.openSnackBar(message, 'error');
        return throwError(() => error);
      })
    );
  }
}
