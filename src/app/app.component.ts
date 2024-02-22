import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavbarComponent, SearchCollapseComponent } from './core/components';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UniEvent';

  @ViewChild(SearchCollapseComponent) searchCollapse: SearchCollapseComponent;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  showMenu: boolean = true;
  darkMode: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    router.events.forEach(route => {
      if (route instanceof NavigationStart) {
        this.showMenu = route.url !== '/login' && route.url !== '/signup';
      }
    })

    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if(darkModeChoice === null){
      localStorage.setItem("darkModeChoice", "1");
      this.darkMode = true;
    } else{
      if(darkModeChoice === "0"){
        this.darkMode = false;
      } else{
        this.darkMode = true;
      }
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  showCollapse() {
    var elements = document.getElementById("nav");
    elements.scrollIntoView();
    if (!this.searchCollapse.isShow)
      this.searchCollapse.isShow = true;
  }

  updateSearchButton() {
    this.navbar.isShowed = false;
  }

  updateTheme(){
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if(darkModeChoice === "0"){
      this.darkMode = false;
    } else{
      this.darkMode = true;
    }
  }

}
