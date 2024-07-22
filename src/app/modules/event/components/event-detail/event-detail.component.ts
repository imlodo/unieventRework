import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { EventListComponent } from '../event-list/event-list.component';
import { GlobalService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck } from 'rxjs';
import { ROUTE_LIST } from '../../../../core/utility/global-constant';
import { EventPosterComponent } from '../event-poster/event-poster.component';
import { ContentService } from 'src/app/core/services/contentService/content.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements AfterViewInit {
  @ViewChild(EventListComponent) elc: EventListComponent;
  @ViewChild(EventPosterComponent) epc: EventPosterComponent;
  n_id: string;

  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private contentService: ContentService,
    private route: ActivatedRoute, private router: Router) {
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
    this.contentService.getSingleContent(this.n_id).subscribe(
      (response: any) => {
        this.epc.eventData = response;
        this.getGroupEvents(response.n_group_id);
      },
      error => {
      }
    );
  }

  initializeData() {
    this.epc.n_id = Number(this.n_id);
    this.getEvent();
  }

  getGroupEvents(n_group_id: number) {
    this.contentService.getRelatedEvents(n_group_id).subscribe(
      (response: any) => {
        this.elc.setEventList(response);
        this.epc.groupEvents = response;
        this.epc.initializeData();
      },
      error => {
      }
    );
  }

  goToBuyTicket(n_id: string) {
    const params = this.globalService.encodeParams({
      n_id: n_id
    });
    this.router.navigate([ROUTE_LIST.event.ticket.list, params]);
  }
}
