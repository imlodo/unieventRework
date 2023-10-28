import { Component, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services';
import { pluck } from 'rxjs';
import { EventBestTicketFormComponent } from '../../forms/event-best-ticket-form/event-best-ticket-form.component';
import { OBJECT_MAP_TYPE, allEventList, getTicketNameByType } from '../../../../core/utility/global-constant';
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

  ngAfterContentChecked(): void {
    if (this.ebtc && !this.ebtc.formRows)
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
      this.eventData.t_map_list.forEach(t_maps => {
        t_maps.t_object_maps.forEach(el => {
          let ebtfm: EventBestTicketFormModel = new EventBestTicketFormModel();
          ebtfm.n_id_ticket = el.n_id;
          ebtfm.n_ticket = 0;
          ebtfm.ticket_title = el.t_type ? getTicketNameByType(el.t_type) : "Standard";
          ebtfm.ticket_price = el.n_object_price;
          ebtfm.ticket_person_limit = el.n_limit_buy_for_person ? el.n_limit_buy_for_person : 5;
          ebtfm.ticket_is_available = el.t_seat_list.filter(seat => { !seat.is_sell }).length > 0 ? true : false;
          this.ebtc.addFormToArray(ebtfm);
        });
      })

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

}
