import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from '../../utility/global-constant';
import { NavbarNotificationComponent } from '../navbar-notification/navbar-notification.component';
import { NavbarProfileComponent } from '../navbar-profile/navbar-profile.component';

@Component({
  selector: 'unievent-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild(NavbarNotificationComponent) notificationComponent: NavbarNotificationComponent;
  @ViewChild(NavbarProfileComponent) profileComponent: NavbarProfileComponent;
  online: boolean = true;
  @Output() onShowCollapse: EventEmitter<void> = new EventEmitter();
  isShowed = false;

  logout() {
    alert("Implementare logout")
  }

  showCollapse() {
    if (!this.isShowed)
      this.isShowed = !this.isShowed;
    this.closeOtherNavbarPanel("search");
    this.onShowCollapse.emit();
  }

  closeOtherNavbarPanel(type: string) {
    switch (type) {
      case "profile":
        this.notificationComponent.closeNotifications();
        break;
      case "notification":
        this.profileComponent.closeProfilePanel();
        break;
      default:
        this.notificationComponent.closeNotifications();
        this.profileComponent.closeProfilePanel();
        break;
    }
  }

}
