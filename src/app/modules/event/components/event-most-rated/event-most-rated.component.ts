import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-event-most-rated',
  templateUrl: './event-most-rated.component.html',
  styleUrls: ['./event-most-rated.component.scss']
})
export class EventMostRatedComponent {
  constructor(private router: Router) {
  }

  goToMostRatedEvent() {
    this.router.navigate([ROUTE_LIST.event.most_rated.list]);
  }
}
