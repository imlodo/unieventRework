import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoginFormComponent, LoginFormDataModel } from '../../forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'unievent-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnInit {
  @ViewChild(LoginFormComponent) loginForm: LoginFormComponent;

  constructor(private cdr: ChangeDetectorRef, private cookieService: CookieService, private authService: AuthenticationService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    const authToken = this.cookieService.get("auth_token");
    if (authToken) {
      this.router.navigate(["/"]);
    }
  }

  ngAfterViewInit(): void {
    this.loginForm.createForm(new LoginFormDataModel());
    const rememberedUsername = this.cookieService.get('rememberedUsername');
    if (rememberedUsername) {
      this.loginForm.form.patchValue({ t_username: rememberedUsername });
      this.loginForm.form.patchValue({ t_remember_username: true });
    }
    this.cdr.detectChanges();
  }

  login() {
    let t_username = this.loginForm.form.get("t_username").value;
    let t_password = this.loginForm.form.get("t_password").value;
    this.authService.login(t_username, t_password).subscribe(
      response => {
        this.authService.getUser().subscribe(
          response => {
            const rememberUsername = this.loginForm.form.get('t_remember_username').value;
            if (rememberUsername) {
              this.cookieService.set('rememberedUsername', this.loginForm.form.get("t_username").value, 30);
            } else {
              this.cookieService.delete('rememberedUsername');
            }
            this.router.navigate(["/"]);
          },
          error => {
            this.toastr.error(error.error);
          }
        )

      },
      error => {
        this.toastr.error(error.error);
      }
    );
  }
}
