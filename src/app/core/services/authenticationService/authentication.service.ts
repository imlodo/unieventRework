import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { GENERATE_TOKEN, GET_USER } from '../../utility/api-constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(t_username: string, t_password: string): Observable<any> {
    const body = { t_username, t_password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(GENERATE_TOKEN, body, { headers })
      .pipe(
        tap((response: any) => {
          this.cookieService.set('auth_token', response.token);
        }),
        catchError(this.handleError)
      );
  }

  getUser(): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(GET_USER, { headers })
      .pipe(
        tap((response: any) => {
          this.cookieService.set('current_user', JSON.stringify(response.user));
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
