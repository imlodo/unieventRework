import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs';
import { AuthenticationService, GlobalService, UserService } from '../../../../core/services';
import { FormBuilder, Validators } from '@angular/forms';
import { ROUTE_LIST, getTicketNameByType } from 'src/app/core/utility/global-constant';
import { PaymentStep1FormComponent } from '../../forms/payment-step1-form/payment-step1-form.component';
import { PaymentMethodStep2FormComponent } from '../../forms/payment-step2-payment-method-form/payment-step2-payment-method-form.component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { itLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import { TicketService } from 'src/app/core/services/ticketService/ticket.service';
import { CookieService } from 'ngx-cookie-service';
defineLocale('it', itLocale);

@Component({
  selector: 'unievent-payment-stepper',
  templateUrl: './payment-stepper.component.html',
  styleUrls: ['./payment-stepper.component.scss']
})
export class PaymentStepperComponent implements AfterViewInit {
  @ViewChild(PaymentStep1FormComponent) paymentStep1FormComponent!: PaymentStep1FormComponent;
  @ViewChild(PaymentMethodStep2FormComponent) paymentMethodStep2FormComponent!: PaymentMethodStep2FormComponent;
  @ViewChild('stepper') stepper!: MatStepper;
  eventTicketList: Array<any>;
  minExpiryDate: Date;
  applyedCoupon: { coupon_id: string, code: string, discount: number }
  commissionsOfService: number = 3.55;
  contrassegnoFee: number = 4.99;
  idEvent: string;
  isShowCreditCard: boolean = false;
  isShowAddAddress: boolean = false;
  addressList = [];
  selectedAddressIndex: number;
  selectedCardIndex: number;
  isShowCvv: Array<boolean> = [false];
  isShowBack: Array<boolean> = [false];
  cardList = [];
  creditCard: { cardName: string, cardNumber: string, expiryDate: string, cvv: string } = { cardName: '', cardNumber: '', expiryDate: '', cvv: '' };
  activeStepIndex: number = 0;
  redirectCountdown: number = 10;
  totalPrice: number = 0;
  shippingFee: number = 0;
  isPaymentError: boolean = false;
  isTokenError: boolean = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private localeService: BsLocaleService, private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef, private ticketService: TicketService, private cookieService: CookieService,
    private globalService: GlobalService, private route: ActivatedRoute, private _formBuilder: FormBuilder, private userService: UserService, private authenticationService: AuthenticationService) {
    this.localeService.use('it');
    this.minExpiryDate = moment().add(1, 'month').toDate();
    this.userService.getUserCreditCards().subscribe(
      response => {
        this.cardList = response;
        if (this.cardList.length > 0)
          this.selectedCardIndex = 0;
      },
      error => {
        this.toastr.clear();
        this.toastr.error(error.error);
      }
    );
    this.userService.getUserAddressList().subscribe(
      response => {
        this.addressList = response;
        if (this.addressList.length > 0)
          this.selectedAddressIndex = 0;
      },
      error => {
        this.toastr.clear();
        this.toastr.error(error.error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.cdr.detectChanges();
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        if (decode) {
          this.applyedCoupon = decode.applyedCoupon;
          this.eventTicketList = decode.buyMapObjectList;
          this.idEvent = decode.idEvent;
          this.totalPrice = this.getTotalPrice();
          this.shippingFee = this.getShippingFee();
          this.eventTicketList.forEach(el => {
            el.objectMapType = this.getTypeByEvent(el);
          })
        }
      }
      );
  }

  setActiveStep(index: number) {
    this.verifyBuyToken();

    if (!this.isTokenError) {
      if (index < this.activeStepIndex) {
        this.stepper.previous();
        this.activeStepIndex = index;
        return;
      }

      if (index == 2) {
        if (this.paymentMethodStep2FormComponent.contrassegnoSelected === "Carta di credito" && this.selectedCardIndex === undefined) {
          this.toastr.clear();
          this.toastr.error("Devi selezionare almeno una carta per poter proseguire")
          return;
        }
        if (this.selectedAddressIndex === undefined) {
          this.toastr.clear();
          this.toastr.error("Devi selezionare almeno un indirizzo per poter proseguire")
          return;
        }
      }

      if (index == 3) {
        //card_id, coupon_id, addressId
        this.ticketService.purchase(this.idEvent, this.cardList[this.selectedCardIndex].card_id, this.addressList[this.selectedAddressIndex].address_id, this.applyedCoupon ? this.applyedCoupon.coupon_id : null, this.eventTicketList).subscribe(
          response => {
            this.cookieService.delete("buy_token")
            this.startRedirectCountdown();
          },
          error => {
            this.cookieService.delete("buy_token")
            this.isPaymentError = true;
            this.startRedirectCountdown();
          }
        );
      }

      this.activeStepIndex = index;
      this.stepper.next();
    }

  }

  verifyBuyToken() {
    this.authenticationService.getBuyTokenDetail().subscribe(
      (response: any) => {
      },
      error => {
        this.isTokenError = true;
        this.toastr.clear();
        this.toastr.error('Acquisto non valido, controlla i dati e riprova!');
        this.cookieService.delete("buy_token");
        window.history.back();
      }
    );

  }

  startRedirectCountdown() {
    const timer = setInterval(() => {
      this.redirectCountdown--;
      if (this.redirectCountdown === 0) {
        clearInterval(timer);
        this.router.navigate([ROUTE_LIST.tickets]);
      }
    }, 1000);
  }

  addAddress(address: { firstName: string, lastName: string, street: string, city: string, state: string, zip: string }) {
    this.userService.addAddress(address.firstName, address.lastName, address.street, address.city, address.state, address.zip).subscribe(
      response => {
        this.addressList.push(address);
        this.isShowAddAddress = false;
        this.selectedAddressIndex = 0;
        this.toastr.clear();
        this.toastr.success(null, "Indirizzo aggiunto con successo", { progressBar: true });
      },
      error => {
        this.toastr.error(error.error);
      }
    );
  }

  addCreditCard() {
    if (this.isValidCreditCard(this.creditCard.cardNumber)) {
      if (this.isValidExpiryDate(this.creditCard.expiryDate)) {
        if (/^\d{3}$/.test(this.creditCard.cvv)) {
          this.userService.addUserCard(this.creditCard.cardName, this.creditCard.cardNumber, this.creditCard.expiryDate, this.creditCard.cvv).subscribe(
            response => {
              this.cardList.push(this.creditCard);
              this.creditCard = { cardName: '', cardNumber: '', expiryDate: '', cvv: '' };
              this.isShowCreditCard = false;
              this.selectedCardIndex = 0;
              this.toastr.clear();
              this.toastr.success(null, "Carta di credito aggiunta", { progressBar: true });
              this.isShowCvv.push(false);
              this.isShowBack.push(false);
            },
            error => {
              this.toastr.error(error.error);
            }
          );
        } else {
          this.toastr.clear();
          this.toastr.error(null, "CVV non valido (deve essere di 3 cifre)", { progressBar: true });
        }
      } else {
        this.toastr.clear();
        this.toastr.error(null, "Data di scadenza della carta di credito non valida", { progressBar: true });
      }
    } else {
      this.toastr.clear();
      this.toastr.error(null, "Carta di credito non valida", { progressBar: true });
    }
  }

  isValidCreditCard(cardNumber: string): boolean {
    if (cardNumber === '') {
      return false;
    }
    const cleanedCardNumber = cardNumber.replace(/\s+/g, '');
    const cardDigits = cleanedCardNumber.toString().split('').map(Number);
    const reversedCardDigits = cardDigits.reverse();
    let sum = 0;
    for (let i = 0; i < reversedCardDigits.length; i++) {
      let digit = reversedCardDigits[i];
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  isValidExpiryDate(expiryDate: string): boolean {
    if (!expiryDate) {
      return false;
    }
    const [month, year] = moment(expiryDate).format("MM/YYYY").split('/');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Mese corrente, aggiungi 1 perché i mesi in JavaScript iniziano da 0
    return parseInt(year, 10) >= currentYear && parseInt(month, 10) >= currentMonth;
  }

  selectCard(index: number) {
    this.selectedCardIndex = index;
  }

  getTotalPrice() {
    let total = 0;
    this.eventTicketList?.forEach(el => {
      total += el.n_object_price;
    });
    if (this.paymentMethodStep2FormComponent && this.paymentMethodStep2FormComponent.contrassegnoSelected === "Contrassegno") {
      total += this.contrassegnoFee;
    }
    return total;
  }

  getTypeByEvent(objectMap: any) {
    return getTicketNameByType(objectMap.t_type)
  }

  getShippingFee() {
    if (this.paymentStep1FormComponent && this.paymentStep1FormComponent.selectedShippingMethod === "Corriere espresso Italia") {
      return 9.99;
    }
    return 0;
  }

  getCardNumber(cardNumber: string): string {
    if (cardNumber.length >= 4) {
      const lastFourDigits = cardNumber.slice(-4);
      const asterisks = '*'.repeat(cardNumber.length - 4);
      return asterisks + lastFourDigits;
    } else {
      return cardNumber;
    }
  }

  getCvv(card: { cardName: string, cardNumber: string, expiryDate: string, cvv: string }) {
    return card.cvv;
  }

  updateCardName(event: Event) {
    this.creditCard.cardName = (event.target as HTMLInputElement).value;
  }

  updateCardNumber(event: Event) {
    this.creditCard.cardNumber = (event.target as HTMLInputElement).value;
  }

  updateExpiryDate(date: Date) {
    this.creditCard.expiryDate = date.toDateString();
  }

  updateCvv(event: Event) {
    this.creditCard.cvv = (event.target as HTMLInputElement).value;
  }

}