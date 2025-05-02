import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupabaseFunctionsService } from '@core/services/supabase-functions.service';

@Injectable({ providedIn: 'root' })
export class SubscribeEmailService {
  constructor(private supabaseFunctions: SupabaseFunctionsService) {}

  subscribeEmail(
    email: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    return this.supabaseFunctions.subscribeEmail(email, firstName, lastName);
  }

  unsubscribeEmail(email: string): Observable<any> {
    return this.supabaseFunctions.unsubscribeEmail(email);
  }
}
