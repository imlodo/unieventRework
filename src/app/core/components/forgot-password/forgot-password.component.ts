import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ForgotPasswordFormComponent } from '../../forms/forgot-password-form/forgot-password-form.component';
import { ForgotPasswordFormDataModel } from '../../forms/forgot-password-form/forgot-password-form.model';
import { UserService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ROUTE_LIST } from '../../utility/global-constant';

@Component({
  selector: 'unievent-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @ViewChild(ForgotPasswordFormComponent) forgotPasswordForm: ForgotPasswordFormComponent;

  constructor(private cdr: ChangeDetectorRef, private cookieService: CookieService, private userService: UserService, private toastr:ToastrService, private router:Router) {

  }

  ngAfterViewInit(): void {
    this.forgotPasswordForm.createForm(new ForgotPasswordFormDataModel());
    this.cdr.detectChanges();
  }

  forgotPw() {
    this.userService.generateNewPasswordConfirmationLink(this.forgotPasswordForm.t_username).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.router.navigate([ROUTE_LIST.login])
      },
      error => {
        this.toastr.error('Non è stato possibile richiedere una nuova password, controlla i tuoi dati e riprova.');
      }
    );
  }

}
