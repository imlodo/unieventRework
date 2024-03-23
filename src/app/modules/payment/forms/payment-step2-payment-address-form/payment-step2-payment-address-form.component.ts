import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'unievent-payment-step2-payment-address-form',
  templateUrl: './payment-step2-payment-address-form.component.html',
  styleUrls: ['./payment-step2-payment-address-form.component.scss']
})
export class PaymentStep2PaymentAddressFormComponent {
  addressForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]], // Esempio di pattern per un CAP a 5 cifre
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      console.log('Dati dell\'indirizzo salvati:', this.addressForm.value);
      // Puoi inviare i dati del form al backend o fare altre operazioni qui
    } else {
      console.log('Il form non è valido. Per favore, correggi gli errori.');
    }
  }
}
