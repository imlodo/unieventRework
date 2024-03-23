import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
defineLocale('it', itLocale);
import moment from 'moment'; // Modifica l'importazione

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
  commissionsOfService: number = 3.55; //5%
  contrassegnoFee: number = 4.99;
  idEvent: number;
  isShowCreditCard: boolean = false;
  isShowAddAddress: boolean = false;
  addressList = [];
  cardList = [];
  creditCard: { cardName: string, cardNumber: string, expiryDate: string, cvv: string } = { cardName:'', cardNumber: '', expiryDate: '', cvv: '' };

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private localeService: BsLocaleService, private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private _formBuilder: FormBuilder) {
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

  // Funzione per aggiungere la carta di credito
  addCreditCard() {
    // Qui puoi aggiungere la logica per inviare in modo sicuro i dettagli della carta di credito al server
    console.log('Dettagli carta di credito:', this.creditCard);
    // Aggiungi qui la logica per l'invio sicuro dei dettagli della carta di credito al server
  }

  getTotalPrice() {
    let total = 0;
    let eventMapList = allEventList.filter(event => event.n_id === this.idEvent)[0]?.t_map_list;
    this.eventTicketList?.forEach(el => {
      let filteredMap = eventMapList.filter(map => {
        return map.t_map_id == el.n_id_map;
      });
      let objectMapFiltered: ObjectMap = filteredMap[0].t_object_maps.filter(objectMap => {
        return objectMap.n_id == el.n_id;
      })[0];
      total += objectMapFiltered.n_object_price;
    });
    if(this.paymentMethodStep2FormComponent && this.paymentMethodStep2FormComponent.contrassegnoSelected === "Contrassegno"){
      total+= this.contrassegnoFee;
    }
    return total;
  }

  getTypeByEvent(objectMap: any) {
    return getTicketNameByType(objectMap.t_type)
  }

  getShippingFee(){
    if(this.paymentStep1FormComponent && this.paymentStep1FormComponent.selectedShippingMethod === "Corriere espresso Italia"){
     return 9.99;
    }
    return 0;
  }

}
