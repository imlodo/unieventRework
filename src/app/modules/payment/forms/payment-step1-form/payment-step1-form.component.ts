import { Component } from '@angular/core';

@Component({
  selector: 'unievent-payment-step1-form',
  templateUrl: './payment-step1-form.component.html',
  styleUrls: ['./payment-step1-form.component.scss']
})
export class PaymentStep1FormComponent {
  selectedShippingMethod: string = "Corriere espresso Italia"; // Imposta il valore predefinito

  // Funzione per applicare il coupon
  applyCoupon() {
    console.log("Metodo di spedizione selezionato:", this.selectedShippingMethod);
    // Aggiungi qui la logica per applicare il coupon in base al metodo di spedizione selezionato
  }
}
