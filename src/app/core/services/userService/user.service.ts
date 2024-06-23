import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { EDIT_USER, GET_USER, GET_USER_PROFILE_INFO } from '../../utility/api-constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUser(alias: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('t_alias_generated', alias);

    return this.http.get(GET_USER, { headers, params })
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  editUser(t_name: string, t_surname: string, t_description: string, t_profile_photo: string, t_password: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { t_name, t_surname, t_description, t_profile_photo, t_password };

    return this.http.post(EDIT_USER, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  getUserProfileInfo(t_alias_generated: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('t_alias_generated', t_alias_generated);

    return this.http.get(GET_USER_PROFILE_INFO, { headers, params })
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Errore nella richiesta API:', error);
    return throwError(error);
  }
}
