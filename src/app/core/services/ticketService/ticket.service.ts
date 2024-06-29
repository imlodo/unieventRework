import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ADD_TICKET_REVIEW, CHECK_IS_FOLLOWED, DELETE_ACCOUNT, DOWNLOAD_PERSONAL_DATA, EDIT_USER, FOLLOW_USER, GET_REQUEST_PERSONAL_DATA_STATUS, GET_TICKET_LIST, GET_TICKET_REVIEWS, GET_USER, GET_USER_PROFILE_INFO, GET_USER_SETTINGS, REQUEST_PERSONAL_DATA, SAVE_USER_SETTINGS } from '../../utility/api-constant';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getTicketList(): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    //const params = new HttpParams().set('t_alias_generated', alias);

    return this.http.get(GET_TICKET_LIST, { headers }) //headers, params
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  addTicketReview(t_ticket_id: string, t_title: string, t_body: string, n_star: number, review_date: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { t_ticket_id, t_title, t_body, n_star, review_date };

    return this.http.post(ADD_TICKET_REVIEW, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  getTicketReviews(ticket_id: string, use_username: boolean): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('t_ticket_id', ticket_id).set("use_username", use_username);

    return this.http.get(GET_TICKET_REVIEWS, { headers, params })
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
