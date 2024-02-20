import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'unievent-navbar-notification',
  templateUrl: './navbar-notification.component.html',
  styleUrls: ['./navbar-notification.component.scss']
})
export class NavbarNotificationComponent {
  activeNotification = [true,false];
  showNotifications = false;
  notificationCount:number = 999;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeNotifications();
    }
  }

  closeNotifications() {
    this.showNotifications = false;
  }

  openNotificationModal(){
    this.showNotifications = !this.showNotifications;
  }

  changeNotificationMode(index:number){
    if(index == 1)
      this.activeNotification = [false,true];
    else
      this.activeNotification = [true,false];
  }
}
