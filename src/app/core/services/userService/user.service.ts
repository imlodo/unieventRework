import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CHECK_IS_FOLLOWED, DELETE_ACCOUNT, DOWNLOAD_PERSONAL_DATA, EDIT_USER, FOLLOW_USER, GET_REQUEST_PERSONAL_DATA_STATUS, GET_USER, GET_USER_PROFILE_INFO, GET_USER_SETTINGS, REQUEST_PERSONAL_DATA, SAVE_USER_SETTINGS } from '../../utility/api-constant';

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

  checkIsFollowedByCurrentUser(t_alias_generated_to: string, t_alias_generated_from: string) {
    const token = this.cookieService.get('auth_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = { t_alias_generated_from, t_alias_generated_to };
    return this.http.post<any>(CHECK_IS_FOLLOWED, body, { headers });
  }

  deleteAccount() {
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

  saveUserSettings(type: string, isActive: boolean) {
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

  getUserSettings(type: string) {
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

  requestPersonalData(dataOption: string, chatOption: string, contentOption: string, favoritesOption: string, interactionsOption: string, dataFormat: string) {
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

  getRequestPersonalDataStatus() {
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

  downloadPersonalData(){
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

  private handleError(error: any) {
    console.error('Errore nella richiesta API:', error);
    return throwError(error);
  }
}
