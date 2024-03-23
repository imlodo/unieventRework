import { Component } from '@angular/core';

@Component({
  selector: 'unievent-payment-step2-payment-method-form',
  templateUrl: './payment-step2-payment-method-form.component.html',
  styleUrls: ['./payment-step2-payment-method-form.component.scss']
})
export class PaymentMethodStep2FormComponent {
  contrassegnoSelected: string = "Carta di credito";
}
