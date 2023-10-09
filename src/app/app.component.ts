import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavbarComponent, SearchCollapseComponent } from './core/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UniEvent';

  @ViewChild(SearchCollapseComponent) searchCollapse:SearchCollapseComponent;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private cdr:ChangeDetectorRef){

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
