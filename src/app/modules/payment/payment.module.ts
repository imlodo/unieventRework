import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { PaymentStepperComponent } from './components/payment-stepper/payment-stepper.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentOverviewComponent } from './components/payment-overview/payment-overview.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentStep1FormComponent } from './forms/payment-step1-form/payment-step1-form.component';
import { PaymentMethodStep2FormComponent } from './forms/payment-step2-payment-method-form/payment-step2-payment-method-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaymentStep2PaymentAddressFormComponent } from './forms/payment-step2-payment-address-form/payment-step2-payment-address-form.component';

@NgModule({
  declarations: [
    PaymentStepperComponent,
    PaymentDetailComponent,
    PaymentOverviewComponent,
    PaymentStep1FormComponent,
    PaymentMethodStep2FormComponent,
    PaymentStep2PaymentAddressFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    BsDatepickerModule.forRoot(),
    PaymentRoutingModule
  ],
  exports: [
    PaymentStepperComponent,
    PaymentDetailComponent,
  ],
  id: 'Payment'
})
export class PaymentModule {
  static forRoot() {
    return {
      ngModule: PaymentModule,
      providers: [],
    };
  }
}
