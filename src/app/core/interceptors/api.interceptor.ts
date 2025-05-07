import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiResponse } from '@core/models/api-response.model';
import { CustomSnackbarService } from '@shared/components/custom-snackbar/custom-snackbar.service';

export const SKIP_ERROR_HANDLER_HEADER = 'X-Skip-Error-Handler';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private snackBar = inject(CustomSnackbarService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const skipErrorHandler = req.headers.has(SKIP_ERROR_HANDLER_HEADER);

    // Remove the custom header before sending to server
    let headers = req.headers;
    if (skipErrorHandler) {
      headers = headers.delete(SKIP_ERROR_HANDLER_HEADER);
    }

    const apiReq = req.clone({
      url: `${environment.apiBaseUrl}${req.url}`,
      withCredentials: true,
      headers: headers,
    });

    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!skipErrorHandler) {
          const message =
            (error.error as string[]).join(', ') ||
            error.message ||
            'There was an error processing your request.';
          this.snackBar.openSnackBar(message, 'error');
        }

        return throwError(() => error);
      })
    );
  }
}
