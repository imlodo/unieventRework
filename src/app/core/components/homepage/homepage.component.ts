import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SearchCollapseComponent } from '../../components';

@Component({
  selector: 'unievent-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit{
  @ViewChild(SearchCollapseComponent) searchCollapse:SearchCollapseComponent;
  
  constructor(private cdr:ChangeDetectorRef){

  }
  
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  showCollapse(){
    if(!this.searchCollapse.isShow)
      this.searchCollapse.isShow = true;
  }
}
