import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { BackendApiService } from './backend-api.service';
import { ApiResponse } from '@core/models/api-response.model';

export interface User {
  name: string;
  email: string;
  isVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private backendApi = inject(BackendApiService);
  private router = inject(Router);

  constructor() {
    this.checkAuthStatus(true).subscribe();
  }

  checkAuthStatus(passLogout?: boolean): Observable<boolean> {
    return this.backendApi
      .get<ApiResponse<User>>(
        '/auth/me',
        null,
        this.backendApi.createSkipErrorHandlerHeaders()
      )
      .pipe(
        map((response) => {
          if (response && response.statusCode < 400) {
            this.currentUserSubject.next(response.result);
            const isVerified = response.result?.isVerified ?? false;
            this.isAuthenticatedSubject.next(isVerified);
            return isVerified;
          } else {
            if (!passLogout) {
              this.logout();
            }
            return false;
          }
        }),
        catchError(() => {
          if (!passLogout) {
            this.logout();
          }
          return of(false);
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  logout(): void {
    this.backendApi.post('/auth/logout', {}).subscribe({
      next: () => {
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
      },
    });
  }
}
