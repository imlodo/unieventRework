import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { EventListComponent } from '../event-list/event-list.component';
import { GlobalService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs';
import { ROUTE_LIST, allEventList } from '../../../../core/utility/global-constant';
import { EventPosterComponent } from '../event-poster/event-poster.component';

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
    let groupEvents = allEventList.filter(el => el.n_group_id == n_group_id);
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
