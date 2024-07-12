import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ADD_CONTENT_BOOKED, ADD_DISCUSSION, ADD_LIKE_BY_TYPE, CHECK_CONTENT_IS_BOOKED_BY_CURRENT_USER, CHECK_CONTENT_IS_LIKED_BY_CURRENT_USER, GET_CONTENT_DISCUSSIONS, GET_MORE_CONTENT, GET_MORE_CONTENT_BASED_ON_CURRENT_USER, GET_SINGLE_CONTENT } from '../../utility/api-constant';
import { MORE_CONTENT_TYPE } from '../../utility/enum-constant';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getMoreContent(t_search_str: string,
    t_alias_generated: string,
    t_more_content_type: MORE_CONTENT_TYPE,
    order_by: string,
    order_direction: "ASC" | "DESC",
    pageNumber: number,
    pageSize: number): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = {
      t_search_str,
      t_alias_generated,
      t_more_content_type,
      order_by,
      order_direction,
      pageNumber,
      pageSize
    };

    return this.http.post(GET_MORE_CONTENT, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  getMoreContentBasedOnCurrentUser(order_by: string,
    order_direction: "ASC" | "DESC",
    pageNumber: number,
    pageSize: number): Observable<any> {
      const token = this.cookieService.get('auth_token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
  
      const body = {
        order_by,
        order_direction,
        pageNumber,
        pageSize
      };
  
      return this.http.post(GET_MORE_CONTENT_BASED_ON_CURRENT_USER, body, { headers })
        .pipe(
          tap((response: any) => {
            return response
          }),
          catchError(this.handleError)
        );
    }

  getSingleContent(id: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set("id", id);

    return this.http.get(GET_SINGLE_CONTENT, { headers, params }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  addContentBooked(t_alias_generated: string, content_id: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { t_alias_generated, content_id };

    return this.http.post(ADD_CONTENT_BOOKED, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  checkContentIsBookedByCurrentUser(t_alias_generated: string, content_id: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { t_alias_generated, content_id };

    return this.http.post(CHECK_CONTENT_IS_BOOKED_BY_CURRENT_USER, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  checkContentIsLikedByCurrentUser(t_alias_generated: string, content_id: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { t_alias_generated, content_id };

    return this.http.post(CHECK_CONTENT_IS_LIKED_BY_CURRENT_USER, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  addLikeByType(t_alias_generated: string, content_id: string, discussion_id: string, like_type: "LIKE_CONTENT" | "LIKE_DISCUSSION"): Observable<any> {

    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { t_alias_generated, content_id, discussion_id, like_type };

    return this.http.post(ADD_LIKE_BY_TYPE, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  getContentDiscussions(content_id: string) {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('content_id', content_id);

    return this.http.get(GET_CONTENT_DISCUSSIONS, { headers, params }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  addContentDiscussion(content_id: string, parent_discussion_id: string, body: string, t_alias_generated_reply: string) {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const postBody = { content_id, parent_discussion_id, body, t_alias_generated_reply };

    return this.http.post(ADD_DISCUSSION, postBody, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Errore nella richiesta API:', error);
    return throwError(error);
  }
}
