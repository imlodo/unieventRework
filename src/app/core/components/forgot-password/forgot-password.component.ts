import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ForgotPasswordFormComponent } from '../../forms/forgot-password-form/forgot-password-form.component';
import { ForgotPasswordFormDataModel } from '../../forms/forgot-password-form/forgot-password-form.model';

@Component({
  selector: 'unievent-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @ViewChild(ForgotPasswordFormComponent) forgotPasswordForm: ForgotPasswordFormComponent;

  constructor(private cdr: ChangeDetectorRef, private cookieService: CookieService) {

  }

  ngAfterViewInit(): void {
    this.forgotPasswordForm.createForm(new ForgotPasswordFormDataModel());
    this.cdr.detectChanges();
  }

  forgotPw() {
    if (true) { //Forgot password va a buon fine
    }
    alert("Si deve collegare il forgot Password");
  }

}
