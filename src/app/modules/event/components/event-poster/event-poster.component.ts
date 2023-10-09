import { Component, EventEmitter, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Event } from '../../../../core/models/event';

@Component({
  selector: 'unievent-event-poster',
  templateUrl: './event-poster.component.html',
  styleUrls: ['./event-poster.component.scss']
})
export class EventPosterComponent implements AfterViewInit {
  n_id: number;
  eventData: Event;
  groupEvents: Array<Event>;
  minStartDate: Date;
  maxStartDate: Date;
  minPrice: number;
  averangeStars: number;
  countReviews: number;
  ratingArr = [];
  @Output() onBuy: EventEmitter<void> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {
    
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  initializeData() {
    this.setEventRangeDate();
    this.setMinPrice();
    this.setAverangeStars();
  }

  setEventRangeDate() {
    this.minStartDate = this.eventData.t_event_dates[0];
    this.maxStartDate = this.eventData.t_event_dates[this.eventData.t_event_dates.length - 1]
    if (this.groupEvents.length) {
      this.groupEvents.forEach(el => {
        el.t_event_dates.forEach(date=>{
          if(this.minStartDate > date)
            this.minStartDate = date;
        });
        el.t_event_dates.forEach(date=>{
          if(this.maxStartDate < date)
            this.maxStartDate = date;
        });
      })
    }
  }

  setMinPrice() {
    this.eventData.t_price.forEach(el => {
      if (!this.minPrice)
        this.minPrice = el.ticket_price;
      if (this.minPrice > el.ticket_price)
        this.minPrice = el.ticket_price;
    });
    this.groupEvents.forEach(el => {
      el.t_price.forEach(el => {
        if (!this.minPrice)
          this.minPrice = el.ticket_price;
        if (this.minPrice > el.ticket_price)
          this.minPrice = el.ticket_price;
      });
    });
  }

  setAverangeStars() {
    this.countReviews = 0;
    if (this.eventData.t_reviews) {
      this.eventData.t_reviews.forEach(el => {
        if (el.n_stars) {
          if (!this.averangeStars)
            this.averangeStars = el.n_stars;
          else
            this.averangeStars += el.n_stars;
          this.countReviews += 1;
        }
      });
    }
    this.groupEvents.forEach(el => {
      if (el.t_reviews) {
        el.t_reviews.forEach(el2 => {
          if (!this.averangeStars)
            this.averangeStars = el2.n_stars;
          else
            this.averangeStars += el2.n_stars;
          this.countReviews += 1;
        });
      }
    });

    if (this.averangeStars)
      this.averangeStars /= this.countReviews;

    for (let index = 0; index < 5; index++) {
      this.ratingArr.push(index);
    }
  }

  buy() {
    this.onBuy.emit();
  }

  showIcon(index: number) {
    if (this.averangeStars >= index + 1) {
      return 'star';
    } else if (this.averangeStars >= index + 0.5) {
      return 'star_half_icon';
    } else {
      return 'star_border';
    }
  }

}
