import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs';
import { GlobalService } from '../../../../core/services';
import { FormBuilder, Validators } from '@angular/forms';
import { allEventList, getTicketNameByType } from 'src/app/core/utility/global-constant';
import { ObjectMap } from 'src/app/core/models/objectMap';
import { PaymentStep1FormComponent } from '../../forms/payment-step1-form/payment-step1-form.component';
import { PaymentMethodStep2FormComponent } from '../../forms/payment-step2-payment-method-form/payment-step2-payment-method-form.component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { itLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
defineLocale('it', itLocale);

@Component({
  selector: 'unievent-payment-stepper',
  templateUrl: './payment-stepper.component.html',
  styleUrls: ['./payment-stepper.component.scss']
})
export class PaymentStepperComponent implements AfterViewInit {
  @ViewChild(PaymentStep1FormComponent) paymentStep1FormComponent!: PaymentStep1FormComponent;
  @ViewChild(PaymentMethodStep2FormComponent) paymentMethodStep2FormComponent!: PaymentMethodStep2FormComponent;
  eventTicketList: Array<any>;
  minExpiryDate: Date;
  applyedCoupon: { code: string, sconto: number }
  commissionsOfService: number = 3.55;
  contrassegnoFee: number = 4.99;
  idEvent: string;
  isShowCreditCard: boolean = false;
  isShowAddAddress: boolean = false;
  addressList = [];
  selectedAddressIndex: number;
  selectedCardIndex: number = 0;
  isShowCvv: Array<boolean> = [false];
  isShowBack: Array<boolean> = [false];
  cardList = [{cardName:"Antonio Lodato", cardNumber:"4830636459388384", expiryDate: moment().add(2,'months').toDate().toDateString(), cvv: "341"}];
  creditCard: { cardName: string, cardNumber: string, expiryDate: string, cvv: string } = { cardName: '', cardNumber: '', expiryDate: '', cvv: '' };
  activeStepIndex: number = 0;
  redirectCountdown: number = 10;
  /* 
    Se non vuoi far apparire la carta inizialmente 
    cardList = [];
    selectedCardIndex: number;
    isShowCvv: Array<boolean> = [];
    isShowBack: Array<boolean> = [];
  */

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private localeService: BsLocaleService, private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private _formBuilder: FormBuilder) {
    this.localeService.use('it');
    this.minExpiryDate = moment().add(1, 'month').toDate();
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
        }
      }
      );
  }

  setActiveStep(index: number) {
    this.activeStepIndex = index;
    if (index === 3) {
      this.startRedirectCountdown();
    }
  }

  startRedirectCountdown() {
    const timer = setInterval(() => {
      this.redirectCountdown--;
      if (this.redirectCountdown === 0) {
        clearInterval(timer);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  addAddress(address:{ firstName: string, lastName: string, street: string, city: string, state: string, zip: string }){
    this.addressList.push(address);
    this.isShowAddAddress = false;
    this.selectedAddressIndex = 0;
  }

  addCreditCard() {
    if (this.isValidCreditCard(this.creditCard.cardNumber)) {
      if (this.isValidExpiryDate(this.creditCard.expiryDate)) {
        if (/^\d{3}$/.test(this.creditCard.cvv)) {
          this.cardList.push(this.creditCard);
          this.creditCard = { cardName: '', cardNumber: '', expiryDate: '', cvv: '' };
          this.isShowCreditCard = false;
          this.selectedCardIndex = 0;
          this.toastr.clear();
          this.toastr.success(null, "Carta di credito aggiunta", { progressBar: true });
          this.isShowCvv.push(false);
          this.isShowBack.push(false);
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
    console.log(expiryDate)
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
    let eventMapList = allEventList.filter(event => event.id === this.idEvent)[0]?.t_map_list;
    this.eventTicketList?.forEach(el => {
      let filteredMap = eventMapList.filter(map => {
        return map.t_map_id == el.n_id_map;
      });
      let objectMapFiltered: ObjectMap = filteredMap[0].t_object_maps.filter(objectMap => {
        return objectMap.n_id == el.n_id;
      })[0];
      total += objectMapFiltered.n_object_price;
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

  getExpiryDate(expiryDate: string){
    return moment(expiryDate).format("MM/YYYY");
  }

  getCvv(card:{ cardName: string, cardNumber: string, expiryDate: string, cvv: string }){
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