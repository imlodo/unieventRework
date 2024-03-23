import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStep2PaymentAddressFormComponent } from './payment-step2-payment-address-form.component';

describe('PaymentStep2PaymentAddressFormComponent', () => {
  let component: PaymentStep2PaymentAddressFormComponent;
  let fixture: ComponentFixture<PaymentStep2PaymentAddressFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentStep2PaymentAddressFormComponent]
    });
    fixture = TestBed.createComponent(PaymentStep2PaymentAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
