import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { LocalService } from '../../services';
import { SignUpFormDataModel, SignupFormComponent } from '../../forms';

@Component({
  selector: 'unievent-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {
  
  @ViewChild(SignupFormComponent) signUpForm:SignupFormComponent

  constructor(private localStore: LocalService, private cdr:ChangeDetectorRef) {
    this.localStore.saveData("x","lodolodo");
    console.log(this.localStore.getData("x"));
  }
  ngAfterViewInit(): void {
    this.signUpForm.createForm(new SignUpFormDataModel());
    this.cdr.detectChanges();
  }

  signUp(){
    console.log('sign up');
  }
}
