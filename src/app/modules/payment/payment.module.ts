import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { PaymentStepperComponent } from './components/payment-stepper/payment-stepper.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentOverviewComponent } from './components/payment-overview/payment-overview.component';


@NgModule({
  declarations: [
    PaymentStepperComponent,
    PaymentDetailComponent,
    PaymentOverviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
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
