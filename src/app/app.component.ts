import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HomepageComponent, LoginComponent, NavbarComponent, NotFoundComponent, SearchCollapseComponent, SignupComponent } from './core/components';
import { ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'UniEvent';

  @ViewChild(SearchCollapseComponent) searchCollapse: SearchCollapseComponent;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  @ViewChild(NotFoundComponent) notfound: NotFoundComponent;

  showMenu: boolean = true;
  showMenuLeft: boolean = true;
  darkMode: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
   
  }

  ngOnInit(): void {
    
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const rootRoute = this.findRootRoute(this.router.routerState.snapshot.root);
      this.showMenu = rootRoute && rootRoute.routeConfig?.component !== LoginComponent && rootRoute.routeConfig?.component !== SignupComponent;
      console.log(rootRoute);
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
    this.searchCollapse.isShow = false;
    this.navbar.isShowed = false;
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
