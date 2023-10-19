import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { EventListComponent } from '../event-list/event-list.component';
import { GlobalService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs';
import { ROUTE_LIST, allEventList } from '../../../../core/utility/global-constant';
import { EventPosterComponent } from '../event-poster/event-poster.component';
import { Event } from 'src/app/core/models/event';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements AfterViewInit {
  @ViewChild(EventListComponent) elc: EventListComponent;
  @ViewChild(EventPosterComponent) epc: EventPosterComponent;
  n_id: number;

  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.cdr.detectChanges();
  }

  goToDetailSection() {
    var elements = document.getElementById("#detail");
    elements.scrollIntoView();
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        if (decode.n_id) {
          this.n_id = decode.n_id;
          this.initializeData();
        }
      }
      );
  }

  getEvent() {
    let index = allEventList.findIndex(el => el.n_id == this.n_id);
    let tmpEvent = allEventList.at(index);
    this.epc.eventData = tmpEvent;
    this.getGroupEvents(tmpEvent.n_group_id);
  }

  initializeData() {
    this.epc.n_id = this.n_id;
    this.getEvent();
  }

  getGroupEvents(n_group_id: number) {
    let tmpGroupEvents = allEventList.filter(el => el.n_group_id == n_group_id);
    let groupEvents = new Array<Event>();
    tmpGroupEvents.forEach(el => {
      if (el.t_event_dates.length > 1) {
        let tmpDateArray = [];
        el.t_event_dates.forEach(date => {
          let tmpEvent: Event = {
            n_id: el.n_id,
            n_group_id: el.n_group_id,
            t_title: el.t_title,
            t_image_link: el.t_image_link,
            t_description: el.t_description,
            t_type: el.t_type,
            t_location: el.t_location,
            t_event_dates: [date],
            t_price: el.t_price,
            t_service_price: el.t_service_price,
            t_reviews: el.t_reviews,
            t_bookings_list: el.t_bookings_list,
            t_external_link: el.t_external_link,
            t_artist_list: el.t_artist_list,
            t_company: el.t_company,
            b_external_event: el.b_external_event,
            b_active: el.b_active,
            t_day_sell_max: el.t_day_sell_max,
            t_total_sell_max: el.t_total_sell_max,
            n_vendite: el.n_vendite,
            n_click: el.n_click
          }
          if (!tmpDateArray[date.toLocaleDateString("it-it", { weekday: "long", year: "numeric", month: "long", day: "numeric" })]) {
            tmpDateArray[date.toLocaleDateString("it-it", { weekday: "long", year: "numeric", month: "long", day: "numeric" })] = true;
            groupEvents.push(tmpEvent);
          }
        });
      } else {
        groupEvents.push(el);
      }
    });
    
    this.elc.setEventList(groupEvents);
    this.epc.groupEvents = groupEvents;
    this.epc.initializeData();
  }

  goToBuyTicket(n_id: number) {
    const params = this.globalService.encodeParams({
      n_id: n_id
    });
    this.router.navigate([ROUTE_LIST.event.ticket.list, params]);
  }
}
