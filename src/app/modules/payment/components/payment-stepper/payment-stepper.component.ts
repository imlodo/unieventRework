import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { GlobalService } from '../../../../core/services';
import { EventBuyTicketRequest } from '../../../../modules/event';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'unievent-payment-stepper',
  templateUrl: './payment-stepper.component.html',
  styleUrls: ['./payment-stepper.component.scss']
})
export class PaymentStepperComponent implements AfterViewInit {
  
  eventTicketList:Array<EventBuyTicketRequest>
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private _formBuilder: FormBuilder){

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
