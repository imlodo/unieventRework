import { Component, ChangeDetectorRef, ViewChild, ElementRef, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../../core/services';
import { ROUTE_LIST, getTicketNameByType } from 'src/app/core/utility/global-constant';
import { pluck } from 'rxjs';
import { ObjectMap } from 'src/app/core/models/objectMap';
import { Event } from 'src/app/core/models/event';

@Component({
  selector: 'unievent-payment-overview',
  templateUrl: './payment-overview.component.html',
  styleUrls: ['./payment-overview.component.scss']
})
export class PaymentOverviewComponent {
  eventTicketList: Array<ObjectMap>;
  imgLink: string;
  totalTicketPrice: string;
  totalTicket: number;
  currency: string = "€";
  commissionsOfService: number = 3.55; //5%
  eventData: Event;
  isAvailableTimeout: boolean = false;
  timeoutDate:Date= new Date(new Date().getTime() + 15*60000); //ho aggiunto 15 minuti
  serviceCommission: string;
  @ViewChild('days', { static: true }) days: ElementRef;
  @ViewChild('hours', { static: true }) hours: ElementRef;
  @ViewChild('minutes', { static: true }) minutes: ElementRef;
  @ViewChild('seconds', { static: true }) seconds: ElementRef;

  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    setInterval(() => {
      this.timeoutDate.setSeconds(this.timeoutDate.getSeconds() - 1);
      this.updateTimeout();
    }, 1000);


    this.cdr.detectChanges();
  }

  decodeParams() {
    try {
      this.route.params
        .pipe(pluck('params'))
        .subscribe((result) => {
          const decode = this.globalService.decodeParams(result);
          if (decode.eventTicketList && decode.eventData) {
            this.eventTicketList = decode.eventTicketList;
            this.eventData = decode.eventData;
            this.totalTicket = this.eventTicketList.length;
            this.getTotalTicketPrice();
          } else {
            this.router.navigate(['404']);
          }
        });
    } catch (error) {
      this.router.navigate(['404']);
    }
  }

  getTotalTicketPrice() {
    let totalPrice = 0;
    this.eventTicketList.forEach(el => {
      totalPrice += el.n_object_price;
    })
    let totalPriceCopy = totalPrice;
    totalPrice = totalPrice + (totalPrice*(this.commissionsOfService/100));
    this.serviceCommission = (totalPrice - totalPriceCopy).toFixed(2).replace(".",",");
    this.totalTicketPrice = totalPrice.toFixed(2).replace(".", ",");
  }

  getTicketName(type: any) {
    return getTicketNameByType(type);
  }

  getTicketPriceString(price: number) {
    return this.currency +' '+ price.toFixed(2).replace(".", ",");
  }

  goBack(){
    const params = this.globalService.encodeParams({
      n_id:this.eventData.n_id
    });
    this.router.navigate([ROUTE_LIST.event.ticket.list, params]);
  }

  getDate(){
    return new Date(this.eventData.t_event_date).toLocaleDateString('it-it', { weekday:"long", year:"numeric", month:"long",day:"numeric", hour:"numeric", minute:"numeric"});
  }

  updateTimeout(){
    let currentDate = new Date();
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    if(this.timeoutDate > currentDate ){
      this.isAvailableTimeout = true;
      seconds = Math.abs(this.timeoutDate.getTime()-currentDate.getTime()) / 1000;
      days = Math.trunc(seconds/(60*60*24));
      hours = Math.trunc(seconds/(60*60)) - days*24;
      minutes = Math.trunc(seconds/(60)) - (hours*60 + days*24*60);
      seconds = Math.trunc(seconds) - (minutes*60 + hours*60*60 + days*24*60*60);
    } else{
      this.isAvailableTimeout = false;
    }
    this.days.nativeElement.innerText = days;
    this.hours.nativeElement.innerText = hours;
    this.minutes.nativeElement.innerText = minutes;
    this.seconds.nativeElement.innerText = seconds;
    
  }

  getNumeroPosti(object:ObjectMap){
    return object.t_seat_list.map(el=>el.n_seat_num).toString();
  }

}
