import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-event-near',
  templateUrl: './event-near.component.html',
  styleUrls: ['./event-near.component.scss']
})
export class EventNearComponent {
  
  constructor(private router: Router) {
  }

  goToNearEvent() {
    this.router.navigate([ROUTE_LIST.event.near.list]);
  }
}
