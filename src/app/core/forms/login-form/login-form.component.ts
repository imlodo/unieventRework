import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { LoginFormDataModel } from './login-form.model';
//import { defineLocale, itLocale } from 'ngx-bootstrap/chronos';
//import { BsLocaleService } from 'ngx-bootstrap/datepicker';
//import { LocaleService } from '../../../../core/services';
//import { PIVAValidator } from '../../../../core/validators';

@Component({
  selector: 'unievent-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() onLogin: EventEmitter<void> = new EventEmitter();
  form: FormGroup;
  isNew: boolean;
  isEdit: boolean;

  //constructor(private formBuilder: RxFormBuilder, private localeService: BsLocaleService, public ls: LocaleService) { }
  constructor(private formBuilder: RxFormBuilder) { }

  ngOnInit() {
    //defineLocale("it", itLocale);
    //this.localeService.use("it");
  }

  createForm(lfdm: LoginFormDataModel) {
    this.form = this.formBuilder.formGroup(lfdm);
  }

  get t_username() { return this.form.get('t_username').value; }
  get t_password() { return this.form.get('t_password').value; }
  get t_remember_username() { return this.form.get('t_remember_username').value; }

  set t_username(t_username: string) { this.form.get('t_username').setValue(t_username); }
  set t_password(t_password: string) { this.form.get('t_password').setValue(t_password); }
  set t_remember_username(t_remember_username: string) { this.form.get('t_remember_username').setValue(t_remember_username); }

  login() { 
    if (this.form.valid) { this.onLogin.emit(); } 
    else { return this.form.markAllAsTouched(); }
  }

  resetForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

}
