import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../services';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private cookieService: CookieService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.cookieService.get("current_user")) {
      let currentUser = (JSON.parse(this.cookieService.get("current_user")) as User);
      if (currentUser.t_role !== "Utente" && (state.url !== '/' && !state.url.includes("/supports/detail") && !state.url.includes("/artist/detail"))) {
        this.router.navigate(["/404"])
        return false;
      }
    }

    if (state.url === '/login' || state.url === '/signup' || state.url === '/forgot-password') {
      const authToken = this.cookieService.get("auth_token");
      if (authToken) {
        this.router.navigate(["/"]);
      }
      return true;
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
