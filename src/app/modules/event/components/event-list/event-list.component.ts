import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../../../core/models/event';
import { ModalComponent } from '../../../../core/components';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { COLORS } from '../../../../core/utility/global-constant';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarView, collapseAnimation } from 'angular-calendar';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import moment from 'moment';
const displayNameMap = new Map([[Breakpoints.XSmall, 'xs'], [Breakpoints.Small, 'sm'], [Breakpoints.Medium, 'md'], [Breakpoints.Large, 'lg'], [Breakpoints.XLarge, 'xl']]);
registerLocaleData(localeIt);

@Component({
  selector: 'unievent-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  animations: [collapseAnimation]
})
export class EventListComponent implements AfterViewInit {
  @Output() onGoToBuyTicket: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(ModalComponent) mc: ModalComponent;
  eventList: Array<Event>;
  actions: CalendarEventAction[] = [
    {
      label: 'Edit',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: 'Delete',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  events: Array<CalendarEvent> = [];
  destroyed = new Subject<void>();
  currentScreenSize: string;
  isCalendar: boolean = false;
  isFilter: boolean = false;

  constructor(breakpointObserver: BreakpointObserver, private modal: NgbModal, private cdr: ChangeDetectorRef) {
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  getMinPriceForEvent(eventData: Event) {
    let eventMinPrice = null;
    eventData.t_map_list.forEach(t_maps => {
      if (t_maps.t_object_maps && t_maps.t_object_maps.length > 0) {
        if (t_maps.t_object_maps[0].n_object_price) {
          eventMinPrice = t_maps.t_object_maps[0].n_object_price;
        }
        t_maps.t_object_maps.forEach(map => {
          if (!eventMinPrice) {
            if (map.n_object_price) {
              eventMinPrice = map.n_object_price;
            }
          } else {
            if (eventMinPrice > map.n_object_price) {
              eventMinPrice = map.n_object_price;
            }
          }
        });
      }
    });

    return eventMinPrice;
  }

  goToBuyTicket(id: string) {
    this.onGoToBuyTicket.emit(id);
  }

  scrollToBottom() {
    setTimeout(function () {
      let el = document.getElementById('eventCalendarList');
      el.scrollIntoView(false);
    }, 5);
  }

  setEventList(uniEventList: Array<Event>) {
    this.eventList = uniEventList;
    this.setDefaultViewDate();
    this.getEventCalendarForThisMonth();
    this.refresh.next();
  }

  setDefaultViewDate() {
    this.viewDate = this.eventList[0].t_event_date;
  }

  /* Gestione calendar */
  locale: string = "it";
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;

  getEventCalendarForThisMonth() {
    this.events = [];
    this.eventList.forEach(elEvent => {
      let tmpColor = this.getEventTicketAvailability(elEvent);
      let calendarEvent: CalendarEvent = {
        id: elEvent.id,
        title: elEvent.t_caption,
        start: startOfDay(moment(elEvent.t_event_date).toDate()),
        end: startOfDay(moment(elEvent.t_event_date).toDate()),
        color: tmpColor,
        meta: { eventData: elEvent },
      };
      this.events.push(calendarEvent);
    });
  }


  getEventTicketAvailability(eventData: Event) {
    return eventData.t_event_date >= new Date() ? COLORS['green'] : COLORS['red'];
  }

  increment() {
    this.viewDate = new Date(this.viewDate);
    this.viewDate.setMonth(this.viewDate.getMonth() + 1);
    this.closeOpenMonthViewDay();
    this.refresh.next();
  }

  decrement() {
    this.viewDate = new Date(this.viewDate);
    this.viewDate.setMonth(this.viewDate.getMonth() - 1);
    this.closeOpenMonthViewDay();
    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(new Date(date), new Date(this.viewDate))) {
      if (
        (isSameDay(new Date(this.viewDate), new Date(date)) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.mc.modalData = { event, action };
    this.modal.open(this.mc.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  /* Fine gestione calendar */

}
