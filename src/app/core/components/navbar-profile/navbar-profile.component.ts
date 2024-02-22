import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { ROUTE_LIST, USER_TYPE } from '../../utility/global-constant';
import { Router } from '@angular/router';

@Component({
  selector: 'unievent-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent {
  constructor(private elementRef: ElementRef, private router: Router) {
  }

  @Output() logoutEvent = new EventEmitter<void>();
  @Output() closeOtherNavbarPanelEvent = new EventEmitter<void>();
  showProfilePanel: boolean = false;
  activeMod: boolean = false;
  user: User = {
    t_username: "lodo",
    t_password: "lodo",
    t_name: "Antonio",
    t_surname: "Lodato",
    t_alias_generated: "lodo32",
    t_description: "Sono un bel ragazzo",
    t_profile_photo: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/336655652_1366549564142836_6189179333211279215_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MMspqbZpIoEAX8SJzKR&_nc_ht=scontent.fnap5-1.fna&oh=00_AfCxMQHUITv5n3ssutheEupX0QdJ4fcrGeR0ACM3DoT_9w&oe=65DB9102",
    t_type: USER_TYPE.CUSTOMER
  };

  launchLogoutEvent() {
    this.logoutEvent.emit();
  }

  openProfilePanel() {
    this.closeOtherNavbarPanelEvent.emit
    this.showProfilePanel = !this.showProfilePanel;
  }

  closeProfilePanel() {
    this.showProfilePanel = false;
  }

  goTo(type: string) {
    this.closeProfilePanel();
    switch (type) {
      case "profile":
        this.router.navigate([ROUTE_LIST.profile,]);
        break;
      case "bookmarks":
        this.router.navigate([ROUTE_LIST.bookmarks]);
        break;
      case "settings":
        this.router.navigate([ROUTE_LIST.settings.account]);
        break;
      case "supports":
        this.router.navigate([ROUTE_LIST.supports]);
        break;
      case "tickets":
        this.router.navigate([ROUTE_LIST.tickets]);
        break;
    }
  }

  changeMod() {
    this.activeMod = !this.activeMod;
  }
}
