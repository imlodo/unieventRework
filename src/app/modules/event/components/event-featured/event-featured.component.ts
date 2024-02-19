import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-event-featured',
  templateUrl: './event-featured.component.html',
  styleUrls: ['./event-featured.component.scss']
})
export class EventFeaturedComponent {
  constructor(private router: Router) {
  }

  goToFeaturedEvent() {
    this.router.navigate([ROUTE_LIST.event.featured.list]);
  }
}
