import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SignUpFormDataModel, SignupFormComponent } from '../../forms';
import { UserService } from '../../services';
import moment from 'moment';
import { ROUTE_LIST, USER_TYPE } from '../../utility/global-constant';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'unievent-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {
  
  @ViewChild(SignupFormComponent) signUpForm:SignupFormComponent

  constructor(private cdr:ChangeDetectorRef, private userService: UserService, private toastr: ToastrService, private route: Router) {
    
  }
  ngAfterViewInit(): void {
    this.signUpForm.createForm(new SignUpFormDataModel());
    this.cdr.detectChanges();
  }

  signUp(){
    this.userService.createNewUser(this.signUpForm.t_username, this.signUpForm.t_password, this.signUpForm.t_name, this.signUpForm.t_surname, moment(this.signUpForm.t_birthday).format("DD-MM-YYYY"), USER_TYPE[this.signUpForm.t_type]).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.route.navigate([ROUTE_LIST.login])
      },
      error => {
        this.toastr.error('Non è stato possibile creare il tuo account, controlla i tuoi dati e riprova.');
      }
    );
  }
}
