import { Component, EventEmitter, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Event } from '../../../../core/models/event';
import moment from 'moment';

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
  isShowReviewsPanel: boolean = false;

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
    this.minStartDate = this.eventData.t_event_date;
    this.maxStartDate = this.eventData.t_event_date;
    if (this.groupEvents.length) {
      this.groupEvents.forEach(el => {
        if (this.minStartDate > el.t_event_date)
          this.minStartDate = el.t_event_date;
        if (this.maxStartDate < el.t_event_date)
          this.maxStartDate = el.t_event_date;
      })
    }
    this.minStartDate = moment(this.minStartDate).toDate();
    this.maxStartDate = moment(this.maxStartDate).toDate();
  }

  setMinPrice() {
    this.groupEvents.forEach(el => {
      el.t_map_list.forEach(t_maps =>{
        t_maps.t_object_maps.forEach(map => {
          if (!this.minPrice)
            this.minPrice = map.n_object_price;
          if (this.minPrice > map.n_object_price)
            this.minPrice = map.n_object_price;
        });
      });
      
    });
  }

  setAverangeStars() {
    this.countReviews = 0;
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

  getArrayFromRatingNumber(stars: number): number[] {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;
    const starArray = Array(fullStars).fill(1);
  
    if (hasHalfStar) {
      starArray.push(0.5);
    }
  
    return starArray;
  }
  
  showStarViewIcon(starValue: number): string {
    return starValue === 1 ? 'star' : 'star_half';
  }
  

  openReviewsPanel(){
    this.isShowReviewsPanel=true;
  }

  closeReviewsPanel(){
    this.isShowReviewsPanel=false;
  }
}
