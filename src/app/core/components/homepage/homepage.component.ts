import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/user';
@Component({
  selector: 'unievent-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  isModerate: boolean = false;
  constructor(private cookieService: CookieService) {
    let currentUser = (JSON.parse(this.cookieService.get("current_user")) as User);
    if (currentUser.t_role != "Utente") {
      this.isModerate = true;
    }
  }
}
