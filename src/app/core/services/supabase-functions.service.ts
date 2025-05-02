import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SUPABASE_HTTP_CLIENT } from './http-client-factory.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseFunctionsService {
  constructor(@Inject(SUPABASE_HTTP_CLIENT) private http: HttpClient) {}

  /**
   * Subscribe email to receive notifications about new movies
   */
  subscribeEmail(
    email: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    return this.http.post('/create-subscriber-movie', {
      email,
      first_name: firstName,
      last_name: lastName,
    });
  }

  /**
   * Unsubscribe email from movie notifications
   */
  unsubscribeEmail(email: string): Observable<any> {
    return this.http.post('/unsubscribe-movie', {
      email,
    });
  }
}
