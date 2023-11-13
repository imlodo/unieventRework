import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStep1FormComponent } from './payment-step1-form.component';

describe('PaymentStep1FormComponent', () => {
  let component: PaymentStep1FormComponent;
  let fixture: ComponentFixture<PaymentStep1FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentStep1FormComponent]
    });
    fixture = TestBed.createComponent(PaymentStep1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
