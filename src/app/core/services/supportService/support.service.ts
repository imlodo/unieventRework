import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ADD_SUPPORT_TICKET_REPLY, CREATE_NEW_SUPPORT_TICKET, GET_SUPPORT_TICKET_DISCUSSION_LIST, GET_SUPPORT_TICKET_LIST } from '../../utility/api-constant';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getSupportTicketList(): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    //const params = new HttpParams().set('t_alias_generated', alias);

    return this.http.get(GET_SUPPORT_TICKET_LIST, { headers }) //headers, params
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  createNewSupportTicket(description: string, attachments: Array<String>): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { description, attachments };

    return this.http.post(CREATE_NEW_SUPPORT_TICKET, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  getSupportTicketDiscussionList(ticket_id: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('ticket_id', ticket_id);

    return this.http.get(GET_SUPPORT_TICKET_DISCUSSION_LIST, { headers, params })
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  addSupportTicketReply(ticket_id: string, body: string, attachments: Array<string>, status: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const bodyParams = { support_ticket_id: ticket_id, body: body, attachments: attachments, status: status };

    return this.http.post(ADD_SUPPORT_TICKET_REPLY, bodyParams, { headers })
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
