import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from '../../utility/global-constant';

@Component({
  selector: 'unievent-navbar-chat',
  templateUrl: './navbar-chat.component.html',
  styleUrls: ['./navbar-chat.component.scss']
})
export class NavbarChatComponent {

  @Output() closeOtherNavbarPanelEvent = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  navigateToMessages(){
    this.closeOtherNavbarPanelEvent.emit();
    this.router.navigate([ROUTE_LIST.messages]);
  }
}
