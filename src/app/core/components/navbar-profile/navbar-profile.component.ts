import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../models/user';
import { USER_TYPE } from '../../utility/global-constant';

@Component({
  selector: 'unievent-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent {
  @Output() logoutEvent = new EventEmitter<void>();
  showProfilePanel:boolean = false;
  activeMod:boolean = false;
  user: User = {
    t_username: "lodo",
    t_password: "lodo",
    t_name: "Antonio",
    t_surname: "Lodato",
    t_alias_generated: "lodo32",
    t_description: "Sono un bel ragazzo",
    t_profile_photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hertha_BSC_vs._West_Ham_United_20190731_%28186%29.jpg/800px-Hertha_BSC_vs._West_Ham_United_20190731_%28186%29.jpg",
    t_type: USER_TYPE.CUSTOMER
  };

  launchLogoutEvent(){
    this.logoutEvent.emit();
  }

  openProfilePanel(){
    this.showProfilePanel = !this.showProfilePanel;
  }

  goTo(type:string){

  }

  changeMod(){
    this.activeMod = !this.activeMod;
  }
}
