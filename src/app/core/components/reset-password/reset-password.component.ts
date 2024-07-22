import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { ROUTE_LIST } from '../../utility/global-constant';

@Component({
  selector: 'unievent-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) {
    window.location.href
  }

  navigateToLogin() {
    this.router.navigate([ROUTE_LIST.login])
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.userService.resetPassword(token).subscribe(
          response => { },
          error => {
            this.toastr.clear();
            this.toastr.error("Errore nel reset della password");
            //this.router.navigate([ROUTE_LIST.login])
          }
        );
      } else {
        this.toastr.clear();
        this.toastr.error("Errore nel reset della password");
        //this.router.navigate([ROUTE_LIST.login])
      }
    });
  }
}
