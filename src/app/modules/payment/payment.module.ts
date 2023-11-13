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

@NgModule({
  declarations: [
    PaymentStepperComponent,
    PaymentDetailComponent,
    PaymentOverviewComponent,
    PaymentStep1FormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
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
