import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SUPABASE_HTTP_CLIENT } from './http-client-factory.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseFunctionsService {
  private http = inject<HttpClient>(SUPABASE_HTTP_CLIENT);

  /**
   * Subscribe email to receive notifications about new movies
   */
  subscribeEmail(email: string): Observable<any> {
    return this.http.post('/create-subscriber-movie', {
      email: email,
    });
  }

  /**
   * Unsubscribe email from movie notifications
   */
  unsubscribeEmail(email: string): Observable<any> {
    return this.http.post('/unsubscribe-movie', {
      email: email,
    });
  }
}
