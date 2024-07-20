import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { ProfileItemType, ROUTE_LIST, USER_TYPE } from '../../utility/global-constant';
import { Router } from '@angular/router';
import { GlobalService } from '../../services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'unievent-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent {

  @Output() logoutEvent = new EventEmitter<void>();
  @Output() closeOtherNavbarPanelEvent = new EventEmitter<void>();
  @Output() updateThemeEvent = new EventEmitter<void>();
  showProfilePanel: boolean = false;
  activeMod: boolean = false;
  @Input() darkMode: boolean;
  user: User;
  @Input() isModerate: boolean = false;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    let eventTarget: any = event;
    console.log()
    if (!this.elementRef.nativeElement.contains(event.target) && !eventTarget.target.toString().includes("SVG")) {
      this.closeProfilePanel();
    }
  }

  constructor(private elementRef: ElementRef, private cookieService: CookieService, private router: Router, private globalService: GlobalService) {
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.user = JSON.parse(cookieCurrentUser);
    }
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === "0") {
      this.activeMod = false;
    } else {
      this.activeMod = true;
    }
  }

  launchLogoutEvent() {
    this.logoutEvent.emit();
  }

  openProfilePanel() {
    this.closeOtherNavbarPanelEvent.emit();
    this.showProfilePanel = !this.showProfilePanel;
  }

  closeProfilePanel() {
    this.showProfilePanel = false;
  }

  goTo(type: string) {
    this.closeProfilePanel();
    switch (type) {
      case "profile":
        const pathProfile = "@/" + this.user.t_alias_generated;
        this.router.navigate([pathProfile]);
        break;
      case "bookmarks":
        const params = this.globalService.encodeParams({
          profileItemType: ProfileItemType.Booked
        });
        const path = "@/" + this.user.t_alias_generated;
        this.router.navigate([path, params]);
        break;
      case "settings":
        this.router.navigate(['settings'], { fragment: 'account' });
        break;
      case "supports":
        this.router.navigate([ROUTE_LIST.supports.basepath]);
        break;
      case "tickets":
        this.router.navigate([ROUTE_LIST.tickets]);
        break;
      case "moderatePanel":
        this.router.navigate([""]);
        break;
    }
  }

  changeMod() {
    this.activeMod = !this.activeMod;
    localStorage.setItem("darkModeChoice", this.activeMod ? "1" : "0");
    this.updateThemeEvent.emit();
  }
}
