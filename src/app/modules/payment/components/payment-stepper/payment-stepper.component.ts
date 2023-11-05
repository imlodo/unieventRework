import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { GlobalService } from '../../../../core/services';
import { EventBuyTicketRequest } from '../../../../modules/event';

@Component({
  selector: 'unievent-payment-stepper',
  templateUrl: './payment-stepper.component.html',
  styleUrls: ['./payment-stepper.component.scss']
})
export class PaymentStepperComponent implements AfterViewInit {
  
  eventTicketList:Array<EventBuyTicketRequest>
  
  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute){

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
        if (decode.eventTicketList) {
          this.eventTicketList = decode.eventTicketList;
          console.log(this.eventTicketList)
        }
      }
      );
  }

}
