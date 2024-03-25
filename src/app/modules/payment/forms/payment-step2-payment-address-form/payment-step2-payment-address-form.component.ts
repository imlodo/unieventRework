import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'unievent-payment-step2-payment-address-form',
  templateUrl: './payment-step2-payment-address-form.component.html',
  styleUrls: ['./payment-step2-payment-address-form.component.scss']
})
export class PaymentStep2PaymentAddressFormComponent implements OnInit {
  addressForm: FormGroup;
  @Output() clearAddressEvent = new EventEmitter<void>();
  @Output() addAddressEvent = new EventEmitter<{ firstName: string, lastName: string, street: string, city: string, state: string, zip: string }>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  clearAddress() {
    this.clearAddressEvent.emit();
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.addAddressEvent.emit(this.addressForm.value);
    } else {
      this.addressForm.markAllAsTouched(); 
    }
  }
}
