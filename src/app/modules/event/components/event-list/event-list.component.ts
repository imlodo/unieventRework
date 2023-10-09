import { Component } from '@angular/core';
import { Event } from 'src/app/core/models/event';

@Component({
  selector: 'unievent-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  eventList: Array<Event>;
  isCalendar:boolean= false;
}
