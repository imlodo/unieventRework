import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoginFormComponent, LoginFormDataModel } from '../../forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'unievent-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnInit {
  @ViewChild(LoginFormComponent) loginForm: LoginFormComponent;

  constructor(private cdr: ChangeDetectorRef, private cookieService: CookieService) {

  }

  ngOnInit(): void {
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
    if (true) //Login va a buon fine
    {
      const rememberUsername = this.loginForm.form.get('t_remember_username').value;
      if (rememberUsername) {
        this.cookieService.set('rememberedUsername', this.loginForm.form.get("t_username").value, 30);
      } else {
        this.cookieService.delete('rememberedUsername');
      }
    }
    alert("Si deve collegare il login");
  }
}
