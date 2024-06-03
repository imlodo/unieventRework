import { Component, EventEmitter, Output } from '@angular/core';
import { ForgotPasswordFormDataModel } from './forgot-password-form.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'unievent-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent {
  @Output() onForgot: EventEmitter<void> = new EventEmitter();
  form: FormGroup;
  isNew: boolean;
  isEdit: boolean;
  dynamicClass = [];

  constructor(private formBuilder: RxFormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    //defineLocale("it", itLocale);
    //this.localeService.use("it");
  }

  createForm(lfdm: ForgotPasswordFormDataModel) {
    this.form = this.formBuilder.formGroup(lfdm);
  }

  get t_username() { return this.form.get('t_username').value; }
  set t_username(t_username: string) { this.form.get('t_username').setValue(t_username); }

  forgot() {
    this.toastr.clear();
    if (this.form.valid) { this.onForgot.emit(); }
    else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if (control.status === "INVALID") {
          Object.keys(control.errors).forEach(index => {
            //Aggiungere traduzione del message 
            this.toastr.warning(null, control.errors[index].message, { progressBar: true });
          });
        }
      });
      return this.form.markAllAsTouched();
    }
  }

  addFocusClass(field: string) {
    this.dynamicClass[field] = "explode-span";
  }

  removeFocusClass(field: string) {
    this.dynamicClass[field] = "";
  }

  resetForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
