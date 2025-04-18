import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `${environment.apiBaseUrl}${req.url}`,
    setHeaders: {
      Authorization: `Bearer ${environment.apiReadAccessToken}`,
    },
  });
  return next(apiReq);
};
