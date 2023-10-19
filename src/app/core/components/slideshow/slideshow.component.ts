import { Component, Input } from '@angular/core';
import { MAX_NUM_SLIDE, ROUTE_LIST } from '../../utility/global-constant';
import { eventList } from '../../utility/global-constant';
import { Event } from '../../models/event';
import { GlobalService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'unievent-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent {
  @Input() eventListFilter: Array<Event>;
  @Input() default_img_link: string = "/assets/img/pexels-sebastian-ervi-1763075.jpg"
  @Input() id: string = "default";

  constructor(private globalService: GlobalService, private router: Router) {
    this.filterSlideshowList();
    //const decode = this.globalService.decodeParams(params);
  }

  filterSlideshowList() {
    if(!this.eventListFilter){
      this.eventListFilter = eventList.filter(el => el.b_active);
    } else {
      this.eventListFilter = this.eventListFilter.filter(el => el.b_active);
    }
    this.eventListFilter = this.eventListFilter.filter(el => el.t_event_dates[el.t_event_dates.length-1] >= new Date()); //Se c'è ancora una data disponibile
    this.eventListFilter = this.eventListFilter.sort((a, b) => {
      if (a.n_vendite && b.n_vendite) {
        if (a.n_vendite > b.n_vendite)
          return -1;
        if (a.n_vendite < b.n_vendite)
          return 1;
      }
      else if (a.n_vendite && b.n_click) {
        if (a.n_vendite > b.n_click)
          return -1;
        if (a.n_vendite < b.n_click)
          return 1;
      }
      else if (a.n_click && b.n_vendite) {
        if (a.n_click > b.n_vendite)
          return -1;
        if (a.n_click < b.n_vendite)
          return 1;
      }
      else if (a.n_click && b.n_click) {
        if (a.n_click > b.n_click)
          return -1;
        if (a.n_click < b.n_click)
          return 1;
      }
      return 0;
    })
    for (let delCount = 0; (this.eventListFilter.length > MAX_NUM_SLIDE) && MAX_NUM_SLIDE >= 0; delCount++) {
      this.eventListFilter.pop();
    }
  }

  buyOrGoToEvent(el: Event, type: string) {
    if (el.b_external_event) {
      window.open(el.t_external_link, "_blank");
    }
    else {
      const params = this.globalService.encodeParams({
        n_id: el.n_id
      });
      if (type == 'go') {
        this.router.navigate([ROUTE_LIST.event.detail, params]);
      } else {
        this.router.navigate([ROUTE_LIST.event.ticket.list, params]);
      }
    }
  }
}
