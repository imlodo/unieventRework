import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ADD_CONTENT, ADD_CONTENT_BOOKED, ADD_COUPON, ADD_DISCUSSION, ADD_LIKE_BY_TYPE, CHECK_CONTENT_IS_BOOKED_BY_CURRENT_USER, CHECK_CONTENT_IS_LIKED_BY_CURRENT_USER, DELETE_CONTENT, DELETE_COUPON, GET_CONTENTS_BY_CURRENT_USER, GET_CONTENT_DISCUSSIONS, GET_COUPONS_FOR_EVENT, GET_COUPON_DISCOUNT_PERCENTAGE, GET_EVENT_BY_NAME, GET_MORE_CONTENT, GET_MORE_CONTENT_BASED_ON_CURRENT_USER, GET_RELATED_EVENTS, GET_SINGLE_CONTENT, UPDATE_CONTENT_PRIVACY, UPDATE_COUPON } from '../../utility/api-constant';
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

  getRelatedEvents(n_group_id: number): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set("n_group_id", n_group_id);

    return this.http.get(GET_RELATED_EVENTS, { headers, params }).pipe(
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

  getContentDiscussions(content_id: string): Observable<any> {
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

  addContentDiscussion(content_id: string, parent_discussion_id: string, body: string, t_alias_generated_reply: string): Observable<any> {
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

  getCouponDiscountPercentage(event_id: string, coupon_code: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const buyToken = this.cookieService.get('buy_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Buy-Token': `Bearer ${buyToken}`,
    });

    const params = new HttpParams().set('event_id', event_id).set('coupon_code', coupon_code);

    return this.http.get(GET_COUPON_DISCOUNT_PERCENTAGE, { headers, params }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );

  }

  addContent(t_type: "Eventi" | "Topics", t_caption: string, t_privacy: string, t_alias_generated: string, t_image_link: string, t_video_link: string, tagArray: Array<String>, hashTag: Array<String>, t_event_date: string, related_event_id: string, group_event_id: number, t_location: any, t_maps: any): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log(related_event_id)

    const postBody = {
      "t_type": t_type, "t_caption": t_caption, "t_privacy": t_privacy, "t_alias_generated": t_alias_generated,
      "related_event_id": related_event_id, "t_image_link": t_image_link, "t_video_link": t_video_link, "tagArray": tagArray, "hashTag": hashTag,
      "t_event_date": t_event_date, "group_event_id": group_event_id, "t_location": t_location, "t_maps": t_maps
    };

    return this.http.post(ADD_CONTENT, postBody, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  getEventByName(t_caption_liked: string): Observable<any> {
    const token = this.cookieService.get('auth_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const params = new HttpParams().set('t_caption_liked', t_caption_liked);

    return this.http.get(GET_EVENT_BY_NAME, { headers, params }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );

  }

  getContentsByCurrentUser(): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(GET_CONTENTS_BY_CURRENT_USER, { headers }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getCouponsForEvent(id: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const params = new HttpParams().set('id', id);

    return this.http.get(GET_COUPONS_FOR_EVENT, { headers, params }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateContentPrivacy(content_id: string, t_privacy: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const postBody = { content_id, t_privacy };

    return this.http.post(UPDATE_CONTENT_PRIVACY, postBody, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  deleteContent(content_id: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const options = {
      headers: headers,
      body: { content_id: content_id }
    };

    return this.http.delete(DELETE_CONTENT, options)
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  deleteCoupon(coupon_id: string) {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const options = {
      headers: headers,
      body: { coupon_id: coupon_id }
    };

    return this.http.delete(DELETE_COUPON, options)
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  addCoupon(coupon_code: string, discount: number, content_id: string) {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const postBody = { coupon_code, discount, content_id };

    return this.http.post(ADD_COUPON, postBody, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  updateCoupon(coupon_id: string, coupon_code: string, discount: number, content_id: string) {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const postBody = { coupon_id, coupon_code, discount, content_id };

    return this.http.post(UPDATE_COUPON, postBody, { headers })
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
