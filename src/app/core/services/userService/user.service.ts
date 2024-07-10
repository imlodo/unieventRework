import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ADD_CHAT_REPLY, CHECK_IS_FOLLOWED, CREATE_NEW_USER, DELETE_ACCOUNT, DOWNLOAD_PERSONAL_DATA, EDIT_USER, FOLLOW_USER, GET_CHAT_LIST, GET_CHAT_MESSAGE_LIST, GET_REQUEST_PERSONAL_DATA_STATUS, GET_USER, GET_USER_FOLLOWED_BY_CURRENT_USER, GET_USER_PROFILE_INFO, GET_USER_SETTINGS, GET_VERIFY_ACCOUNT_STATUS, REQUEST_PERSONAL_DATA, SAVE_USER_SETTINGS, SEND_CONFIRMATION_EMAIL, SEND_NEW_PASSWORD, UNFOLLOW_USER, VERIFY_ACCOUNT } from '../../utility/api-constant';
import { USER_TYPE } from '../../utility/global-constant';

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

  getUserFollowedByCurrentUser(limit:number): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let params = null;

    if(limit != null)
      params = new HttpParams().set('limit', limit);
    else{
      params = new HttpParams();
    }

    return this.http.get(GET_USER_FOLLOWED_BY_CURRENT_USER, { headers, params })
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  editUser(t_name: string, t_surname: string, t_description: string, t_profile_photo: string, actual_password: string, t_password: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { t_name, t_surname, t_description, t_profile_photo, actual_password, t_password };

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

  followUser(t_alias_generated_from: string, t_alias_generated_to: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = { t_alias_generated_from, t_alias_generated_to };
    return this.http.post<any>(FOLLOW_USER, body, { headers });
  }

  unfollowUser(t_alias_generated_to: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = { t_alias_generated_to };
    return this.http.post<any>(UNFOLLOW_USER, body, { headers });
  }

  checkIsFollowedByCurrentUser(t_alias_generated_to: string, t_alias_generated_from: string) {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = { t_alias_generated_from, t_alias_generated_to };
    return this.http.post<any>(CHECK_IS_FOLLOWED, body, { headers });
  }

  deleteAccount(): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(DELETE_ACCOUNT, {}, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  saveUserSettings(type: string, isActive: boolean): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { "setting_type": type, "value": isActive };

    return this.http.post(SAVE_USER_SETTINGS, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  getUserSettings(type: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    if (type != null) {
      const params = new HttpParams().set('setting_type', type);
      return this.http.get(GET_USER_SETTINGS, { headers, params }).pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
    }
    else {
      return this.http.get(GET_USER_SETTINGS, { headers }).pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
    }

  }

  requestPersonalData(dataOption: string, chatOption: string, contentOption: string, favoritesOption: string, interactionsOption: string, dataFormat: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const type_download = dataOption;
    const array_type_download = new Array();
    if (chatOption)
      array_type_download.push('CHAT_DATA');
    if (contentOption)
      array_type_download.push('CONTENT_DATA');
    if (favoritesOption)
      array_type_download.push('BOOKED_DATA');
    if (interactionsOption)
      array_type_download.push('INTERACTION_DATA');

    const body = { "type_download": type_download === 'all' ? ['ALL_DATA'] : array_type_download, "type_data_download": dataFormat };

    return this.http.post(REQUEST_PERSONAL_DATA, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  getRequestPersonalDataStatus(): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(GET_REQUEST_PERSONAL_DATA_STATUS, { headers }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  downloadPersonalData(): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(DOWNLOAD_PERSONAL_DATA, { headers }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getChatList(): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(GET_CHAT_LIST, { headers }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getChatMessageList(alias: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('target_alias', alias);

    return this.http.get(GET_CHAT_MESSAGE_LIST, { headers, params })
      .pipe(
        tap((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  addChatReply(t_alias_generated: string, message: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { t_alias_generated, message };

    return this.http.post(ADD_CHAT_REPLY, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  createNewUser(t_username: string, t_password: string, t_name: string, t_surname: string, t_birthdate: string, t_type: USER_TYPE) : Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { t_username, t_birthdate, t_password, t_name, t_surname, t_type };

    return this.http.post(CREATE_NEW_USER, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  generateNewPasswordConfirmationLink(username: string): Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { username } //{ t_username, t_birthdate, t_password, t_name, t_surname, t_type };

    return this.http.post(SEND_CONFIRMATION_EMAIL, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  resetPassword(token: string) : Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('token', token);

    return this.http.get(SEND_NEW_PASSWORD, { headers, params }).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  verifyAccount(name: string, surname:string, birthdate:string, pIva:string, companyName:string, companyAddress:string, pec:string, consentClauses:boolean, identity_document:Array<{ key: string, file: File }>, status:string, refused_date:string, refused_motivation:string) : Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { name, surname, birthdate, pIva, companyName, companyAddress, pec, consentClauses, identity_document, status, refused_date, refused_motivation};

    return this.http.post(VERIFY_ACCOUNT, body, { headers })
      .pipe(
        tap((response: any) => {
          return response
        }),
        catchError(this.handleError)
      );
  }

  getVerifyAccountStatus(t_alias_generated:string) : Observable<any> {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('t_alias_generated', t_alias_generated);

    return this.http.get(GET_VERIFY_ACCOUNT_STATUS, { headers, params}).pipe(
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
