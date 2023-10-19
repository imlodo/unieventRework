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

  @ViewChild(SearchCollapseComponent) searchCollapse:SearchCollapseComponent;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  showMenu:boolean = true;

  constructor(private router:Router,private cdr:ChangeDetectorRef){
    router.events.forEach(route=>{
      if(route instanceof NavigationStart){
        this.showMenu = route.url !== '/login' && route.url !== '/signup';
      }
    })
  }
  
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  showCollapse(){
    var elements = document.getElementById("nav");
    elements.scrollIntoView();
    if(!this.searchCollapse.isShow)
      this.searchCollapse.isShow = true;
  }

  updateSearchButton(){
    this.navbar.isShowed = false;
  }

}
