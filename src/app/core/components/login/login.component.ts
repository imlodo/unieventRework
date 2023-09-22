import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoginFormComponent, LoginFormDataModel } from '../../forms';

@Component({
  selector: 'unievent-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnInit{
  @ViewChild(LoginFormComponent) loginForm: LoginFormComponent;
  
  constructor(private cdr:ChangeDetectorRef){

  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loginForm.createForm(new LoginFormDataModel());
    this.cdr.detectChanges();
  }

  login(){
    console.log("login");
  }
}
