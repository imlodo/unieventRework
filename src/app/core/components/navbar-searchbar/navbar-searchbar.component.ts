import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'unievent-navbar-searchbar',
  templateUrl: './navbar-searchbar.component.html',
  styleUrls: ['./navbar-searchbar.component.scss']
})
export class NavbarSearchbarComponent {
  @Input() isMobile: boolean;
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  isInputActive: boolean = false;

  checkActive(count: number): void {
    this.isInputActive = count > 0 ? true : false;
  }

  search(value: string): void {
    this.searchEvent.emit(value);
  }
}
