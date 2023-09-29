import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'unievent-search-collapse',
  templateUrl: './search-collapse.component.html',
  styleUrls: ['./search-collapse.component.scss']
})
export class SearchCollapseComponent {
  isShow:boolean = false;
  @Output() onHideSearch: EventEmitter<void> = new EventEmitter();

  hideSearch(){
    this.onHideSearch.emit();
  }

}
