import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { GET_MORE_CONTENT } from '../../utility/api-constant';
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


  private handleError(error: any) {
    console.error('Errore nella richiesta API:', error);
    return throwError(error);
  }
}
