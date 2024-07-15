import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HomepageComponent, LoginComponent, NavbarComponent, NotFoundComponent, SearchCollapseComponent, SignupComponent } from './core/components';
import { ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs';
import { ContentDetailComponent } from './modules/content/compontents/content-detail/content-detail.component';
import { ForgotPasswordComponent } from './core/components/forgot-password/forgot-password.component';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './core/services';
import { ToastrService } from 'ngx-toastr';
import { NavbarLeftMenuComponent } from './core/components/navbar-left-menu/navbar-left-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'UniEvent';

  @ViewChild(SearchCollapseComponent) searchCollapse: SearchCollapseComponent;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  @ViewChild(NavbarLeftMenuComponent) navbarLeft: NavbarLeftMenuComponent;
  @ViewChild(NotFoundComponent) notfound: NotFoundComponent;

  showMenu: boolean = true;
  showMenuLeft: boolean = true;
  darkMode: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef, private toastr: ToastrService, private translate: TranslateService, private cookieService: CookieService, private userService: UserService) {
    // Imposta la lingua predefinita
    this.translate.setDefaultLang('en');

    this.translate.use('it');

    const cookieCurrentUser = this.cookieService.get('current_user');
    const cookieFollowedUser = this.cookieService.get("followed_users");
    if (cookieCurrentUser && !cookieFollowedUser) {
      this.userService.getUserFollowedByCurrentUser(5).subscribe(
        (response: any) => {
          const followedUsersString = JSON.stringify(response.followed_users);
          this.cookieService.set("followed_users", followedUsersString);
          this.navbarLeft.followedUser = response.followed_users
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Errore nel recupero degli utenti seguiti');
        }
      );
    }

  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const rootRoute = this.findRootRoute(this.router.routerState.snapshot.root);
      this.showMenu =
        rootRoute &&
        rootRoute.routeConfig?.component !== LoginComponent &&
        rootRoute.routeConfig?.component !== SignupComponent &&
        rootRoute.routeConfig?.component !== ContentDetailComponent &&
        rootRoute.routeConfig?.component !== ForgotPasswordComponent;
      this.showMenuLeft = this.showMenu && rootRoute && rootRoute.routeConfig?.component === HomepageComponent;
    });

    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === null) {
      localStorage.setItem("darkModeChoice", "1");
      this.darkMode = true;
    } else {
      if (darkModeChoice === "0") {
        this.darkMode = false;
      } else {
        this.darkMode = true;
      }
    }
    this.setMode();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  private findRootRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let currentRoute = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    return currentRoute;
  }

  showCollapse() {
    var elements = document.getElementById("nav");
    elements.scrollIntoView();
    if (!this.searchCollapse.isShow)
      this.searchCollapse.isShow = true;
  }

  closeCollapse() {
    if (this.searchCollapse) {
      this.searchCollapse.isShow = false;
    }
    if (this.navbar) {
      this.navbar.isShowed = false;
    }
  }

  updateSearchButton() {
    this.navbar.isShowed = false;
  }

  updateTheme() {
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === "0") {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
    this.setMode();
  }

  setMode() {
    if (this.darkMode) {
      document.body.classList.add('bg-dark-mode');
      document.body.classList.remove('bg-light-mode');
    } else {
      document.body.classList.add('bg-light-mode');
      document.body.classList.remove('bg-dark-mode');
    }
  }
}
