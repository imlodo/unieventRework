import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NavbarNotificationComponent } from '../navbar-notification/navbar-notification.component';
import { NavbarProfileComponent } from '../navbar-profile/navbar-profile.component';
import { GlobalService } from '../../services';
import { Router } from '@angular/router';
import { ROUTE_LIST } from '../../utility/global-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'unievent-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild(NavbarNotificationComponent) notificationComponent: NavbarNotificationComponent;
  @ViewChild(NavbarProfileComponent) profileComponent: NavbarProfileComponent;
  online: boolean = false;
  @Output() onShowCollapse: EventEmitter<void> = new EventEmitter();
  @Output() onCloseCollapse: EventEmitter<void> = new EventEmitter();
  @Output() updateThemeEvent: EventEmitter<void> = new EventEmitter();
  isShowed = false;
  isMobileSearch = false;
  @Input() darkMode = false;
  @Input() isModerate = false;

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const clickedInsideComponent = this.elementRef.nativeElement.contains(event.target);
    const targetElement = event.target as HTMLElement;
    const hasSearchClasses = targetElement.classList.contains('bi-search') ||
      targetElement.classList.contains('path-bi-search') ||
      targetElement.classList.contains('link-search-text') || 
      targetElement.classList.contains('bi-mic-fill') || 
      targetElement.classList.contains('mat-mdc-tooltip-trigger') ||
      targetElement.classList.contains('bi-path')
    console.log(targetElement.classList)
    if (!clickedInsideComponent && !hasSearchClasses) {
      this.isMobileSearch = false;
    } 
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize(event: Event) {
    this.isMobileSearch = false;
  }

  constructor(private elementRef: ElementRef, private cookieService: CookieService, private router: Router, private globalService: GlobalService) {
    if(this.cookieService.get("auth_token")){
      this.online=true;
    }
  }

  showMobileLeftPanel() {
    alert("Implementare show menu")
  }

  logout() {
    this.online=false;
    this.cookieService.delete('auth_token');
    this.cookieService.delete('current_user');
    this.router.navigate(["/login"])
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
        this.onCloseCollapse.emit();
        this.notificationComponent.closeNotifications();
        break;
      case "notification":
        this.onCloseCollapse.emit();
        this.profileComponent.closeProfilePanel();
        break;
      case "message":
        this.onCloseCollapse.emit();
        this.notificationComponent.closeNotifications();
        this.profileComponent.closeProfilePanel();
        break;
      default:
        this.notificationComponent.closeNotifications();
        this.profileComponent.closeProfilePanel();
        break;
    }
  }

  navigateToSearch(searchInput:string) {
    
    const params = this.globalService.encodeParams({
      searchInput: searchInput,
      searchType: "Tutti"
    });
    this.router.navigate([ROUTE_LIST.search.result, params]);
  }

  updateTheme() {
    this.updateThemeEvent.emit();
  }

}
