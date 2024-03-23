import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentMethodStep2FormComponent } from './payment-step2-payment-method-form.component';


describe('PaymentMethodStep2FormComponent', () => {
  let component: PaymentMethodStep2FormComponent;
  let fixture: ComponentFixture<PaymentMethodStep2FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodStep2FormComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodStep2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
