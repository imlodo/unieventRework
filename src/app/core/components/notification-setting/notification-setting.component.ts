import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from '../../utility/global-constant';

@Component({
  selector: 'unievent-notification-setting',
  templateUrl: './notification-setting.component.html',
  styleUrls: ['./notification-setting.component.scss']
})
export class NotificationSettingComponent {
  @Output() closeNotificationSetting = new EventEmitter<void>();
  @Output() closeNotificationPanel = new EventEmitter<void>();
  @Output() setAllNotificationRead = new EventEmitter<void>();

  constructor(private elementRef: ElementRef, private router: Router) {
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    let eventTarget: any = event;
    if (!this.elementRef.nativeElement.contains(event.target) && (!eventTarget.target.className.includes('more-div') && !eventTarget.target.className.includes('gg-more'))) {
      this.closeNotificationSetting.emit();
    }
  }

  goTo(type: string) {
    switch (type) {
      case "notificationSetting":
        this.closeNotificationPanel.emit();
        this.router.navigate([ROUTE_LIST.settings.notification]);
        break;
      case "notificationList":
        this.closeNotificationPanel.emit();
        this.router.navigate([ROUTE_LIST.notification.list]);
        break;
    }
  }

  setAllRead() {
    this.setAllNotificationRead.emit();
  }

}
