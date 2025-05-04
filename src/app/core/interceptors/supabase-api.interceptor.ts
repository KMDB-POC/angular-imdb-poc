import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment.development';

export const supabaseApiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `${environment.supabaseBaseUrl}${req.url}`,
    setHeaders: {
      Authorization: `Bearer ${environment.supabaseAccessToken}`,
    },
  });
  return next(apiReq);
};
