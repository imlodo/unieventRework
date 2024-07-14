import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { GENERATE_TOKEN, GENERATE_TOKEN_FOR_BUY, GET_BUY_TOKEN_DETAIL, GET_USER, VERIFY_TOKEN } from '../../utility/api-constant';
import { ObjectMap } from '../../models/objectMap';

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

  verifyToken(): Observable<boolean> {
    const token = this.cookieService.get('auth_token');

    if (!token) {
      return of(false);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<boolean>(VERIFY_TOKEN, {}, { headers })
      .pipe(
        map(response => {
          return true
        }
      ),
        catchError(error => {
          return of(false);
        } )
      );
  }

  generateTokenForBuy(t_username:string, t_event_ticket_list: Array<ObjectMap>): Observable<any> {
    const body = { t_username, t_event_ticket_list };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(GENERATE_TOKEN_FOR_BUY, body, { headers })
      .pipe(
        tap((response: any) => {
          this.cookieService.set('buy_token', response.token);
        }),
        catchError(this.handleError)
      );
  }

  getBuyTokenDetail(): Observable<any>{
    const token = this.cookieService.get('buy_token');

    if (!token) {
      this.cookieService.delete("buy_token")
      return this.handleError("Error")
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(GET_BUY_TOKEN_DETAIL, {}, { headers })
      .pipe(
        map(response => {
          return response
        }
      ),
        catchError(error => {
          this.cookieService.delete("buy_token")
          return this.handleError(error);
        } )
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
