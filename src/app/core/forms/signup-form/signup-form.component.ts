import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SignUpFormDataModel } from './signup-form.model';
import { ToastrService } from 'ngx-toastr';
import { USER_TYPE } from '../../utility/global-constant';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'unievent-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  @Output() onSignUp: EventEmitter<void> = new EventEmitter();
  form: FormGroup;
  isNew: boolean;
  isEdit: boolean;
  USER_TYPE_OBJECT = Object.values(USER_TYPE).slice(-3).filter(el=> el != USER_TYPE.ARTIST);
  USER_TYPE_CONST = USER_TYPE;
  dynamicClass = [];

  //constructor(private formBuilder: RxFormBuilder, private localeService: BsLocaleService, public ls: LocaleService) { }
  constructor(private formBuilder: RxFormBuilder, private toastr: ToastrService, private translate: TranslateService) {
   }

  ngOnInit() {
  }

  createForm(sfdm: SignUpFormDataModel) {
    this.form = this.formBuilder.formGroup(sfdm);
  }

  get t_username() { return this.form.get('t_username').value; }
  get t_password() { return this.form.get('t_password').value; }
  get t_name() { return this.form.get('t_name').value; }
  get t_surname() { return this.form.get('t_surname').value; }
  get t_birthday() { return this.form.get('t_birthday').value; }
  get t_type() { return this.form.get('t_type').value; }
  
  set t_username(t_username: string) { this.form.get('t_username').setValue(t_username); }
  set t_password(t_password: string) { this.form.get('t_password').setValue(t_password); }
  set t_name(t_name: string) { this.form.get('t_name').setValue(t_name); }
  set t_surname(t_surname: string) { this.form.get('t_surname').setValue(t_surname); }
  set t_birthday(t_birthday: Date) { this.form.get('t_birthday').setValue(t_birthday); }
  set t_type(t_type: string) { this.form.get('t_type').setValue(t_type); }

  signUp() {
    this.toastr.clear();
    if (this.form.valid) { this.onSignUp.emit(); }
    else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if (control.status === "INVALID") {
          Object.keys(control.errors).forEach(index => {
            //Aggiungere traduzione del message 
            this.toastr.warning(null, this.translate.instant(control.errors[index].message), { progressBar: true });
          });
        }
      });
      return this.form.markAllAsTouched();
    }
  }

  addFocusClass(field:string){
    this.dynamicClass[field] = "explode-span";
  }

  removeFocusClass(field:string){
    this.dynamicClass[field] = "";
  }
  
  resetForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

}
