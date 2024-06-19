import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../services';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private cookieService: CookieService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url === '/login' || state.url === '/signup') {
      return true; // Permetti sempre l'accesso alla pagina di login e signup
    }

    return this.authService.verifyToken().pipe(
      map((isValid: boolean) => {
        if (isValid) {
          return true;
        } else {
          this.cookieService.delete('auth_token');
          this.cookieService.delete('current_user');
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((error) => {
        this.cookieService.delete('auth_token');
        this.cookieService.delete('current_user');
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
