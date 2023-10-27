import { Component, ChangeDetectorRef, AfterViewInit, ViewChild, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services';
import { pluck } from 'rxjs';
import { EventBestTicketFormComponent } from '../../forms/event-best-ticket-form/event-best-ticket-form.component';
import { EVENT_TICKET_TYPE, allEventList } from '../../../../core/utility/global-constant';
import { Event } from '../../../../core/models/event';
import { EventBestTicketFormModel } from '../../forms/event-best-ticket-form/event-best-ticket-form.model';

@Component({
  selector: 'unievent-event-ticket-list',
  templateUrl: './event-ticket-list.component.html',
  styleUrls: ['./event-ticket-list.component.scss']
})
export class EventTicketListComponent implements AfterViewInit {
  n_id: number;
  private eventData: Event;
  isBest: boolean = true;
  @ViewChild(EventBestTicketFormComponent, { static: false }) ebtc: EventBestTicketFormComponent;
  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.cdr.detectChanges();
  }

  ngAfterContentChecked():void{
    if(this.ebtc && !this.ebtc.formRows)
      this.setFormPrice();
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        if (decode.n_id) {
          this.n_id = decode.n_id;
          this.getEventById();
        }
      }
      );
  }

  getEventById() {
    this.eventData = allEventList.find(el => el.n_id === this.n_id);
    this.setFormPrice();
  }

  setFormPrice() {
    if (this.ebtc) {
      this.ebtc.createForm();
      this.ebtc.eventTitle = this.eventData.t_title;
      this.eventData.t_price.forEach(el => {
        let ebtfm: EventBestTicketFormModel = new EventBestTicketFormModel();
        ebtfm.n_id_ticket = el.n_id;
        ebtfm.n_ticket = 0;
        ebtfm.ticket_title = el.t_ticket_name ? el.t_ticket_name : this.getTicketNameByType(el.t_type);
        ebtfm.ticket_price = el.ticket_price;
        ebtfm.ticket_person_limit = el.n_limit_person ? el.n_limit_person : 5;
        ebtfm.ticket_total_limit = el.n_total_limit;
        this.ebtc.addFormToArray(ebtfm);
      });
    }
  }

  showBest() {
    this.isBest = true;
    this.setFormPrice();
    this.cdr.detectChanges();
  }

  showPlan() {
    this.isBest = false;
    this.cdr.detectChanges();
  }

  getTicketNameByType(etpType: EVENT_TICKET_TYPE) {
    switch (etpType) {
      case EVENT_TICKET_TYPE.STANDARD_TICKET_PRICE:
        return "Normale";
      case EVENT_TICKET_TYPE.CONSUPTION_TICKET_PRICE:
        return "Consumazione";
      case EVENT_TICKET_TYPE.BOTTLE_TICKET_PRICE:
        return "Tavolo";
      case EVENT_TICKET_TYPE.BOTTLE_VIP_TICKET_PRICE:
        return "Tavolo VIP";
    }
  }

}
