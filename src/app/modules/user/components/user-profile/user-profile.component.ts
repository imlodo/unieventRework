import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { USER_TYPE } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user:User = { 
    t_name: "Mario",
    t_surname: "Baldi",
    t_alias_generated: "mariobaldi1",
    t_description: "Sono un bel ragazzo",
    t_profile_photo: "/assets/img/userExampleImg.jpeg",
    is_verified: true,
    t_type: USER_TYPE.CREATOR
  }
  userInfo : any;

  constructor(){
    this.userInfo = this.getUserInfoById();
  }

  getUserInfoById(){
    return {
      contentList: [],
      countFollowed: 5312,
      countFollower: 3452,
      countLike: 13891,
      bookedList: [],
      likedList: []
    }
  }

}
