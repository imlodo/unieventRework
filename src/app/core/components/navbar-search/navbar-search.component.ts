import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'unievent-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss']
})
export class NavbarSearchComponent {

  @Output() showMobileSearchEvent: EventEmitter<void> = new EventEmitter<void>();

  showSearch() {
    this.showMobileSearchEvent.emit();
  }
}
