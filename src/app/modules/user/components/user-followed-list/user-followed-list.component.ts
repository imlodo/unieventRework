import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'unievent-user-followed-list',
  templateUrl: './user-followed-list.component.html',
  styleUrls: ['./user-followed-list.component.scss']
})
export class UserFollowedListComponent {
  followList: Array<User> = new Array<User>();
  currentUser: User = null;

  constructor(private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.currentUser = JSON.parse(cookieCurrentUser);
    }

    this.userService.getUserFollowedByCurrentUser(null).subscribe(
      (response: any) => {
        this.followList = response.followed_users;
        console.log(response.followed_users)
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nel recupero degli utenti seguiti');
      }
    );
  }

  navigateToUserProfile(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated;
    this.router.navigate([link]);
  }

  unfollowUser(event:any, item:User) {
    event.preventDefault();
    event.stopPropagation();
    this.userService.unfollowUser(item.t_alias_generated)
      .subscribe(
        response => {
          this.toastr.clear();
          this.toastr.success(response.message);
          this.followList = [...this.followList.filter(el => el.t_alias_generated != item.t_alias_generated)];
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Errore nel unfollow dell\'utente');
        }
      );
  }
}
