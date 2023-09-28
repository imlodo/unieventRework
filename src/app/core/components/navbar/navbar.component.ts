import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'unievent-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  online:boolean = false;
  notificationCount:number = 999;
  @Output() onShowCollapse: EventEmitter<void> = new EventEmitter();
  isShowed = false;

  logout(){
    //Implementare Logout
  }

  showCollapse(){
    if(!this.isShowed)
      this.isShowed=!this.isShowed;
    this.onShowCollapse.emit();
  }

}
