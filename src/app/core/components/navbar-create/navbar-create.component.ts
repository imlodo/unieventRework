import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from '../../utility/global-constant';

@Component({
  selector: 'unievent-navbar-create',
  templateUrl: './navbar-create.component.html',
  styleUrls: ['./navbar-create.component.scss']
})
export class NavbarCreateComponent {
  @Output() closeOtherNavbarPanelEvent = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  navigateToCreatePanel() {
    this.closeOtherNavbarPanelEvent.emit();
    this.router.navigate([ROUTE_LIST.create]);
  }
}
