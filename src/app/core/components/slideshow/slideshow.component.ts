import { Component, Input } from '@angular/core';
import { MAX_NUM_SLIDE } from '../../utility/global-constant';
import { eventList } from '../../utility/global-constant';
import { Event } from '../../models/event';

@Component({
  selector: 'unievent-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent {
  eventListFilter:Array<Event>;
  @Input() id:string = "default";

  constructor(){
    this.filterSlideshowList();
  }

  filterSlideshowList(){
    this.eventListFilter = eventList.filter(el=>el.b_active);
    this.eventListFilter = this.eventListFilter.filter(el=>el.t_sell_end >= new Date());
    this.eventListFilter = this.eventListFilter.sort((a,b)=>{
      if(a.n_vendite && b.n_vendite){ 
        if(a.n_vendite > b.n_vendite)
          return -1;
        if(a.n_vendite < b.n_vendite)
          return 1;
      }
      else if(a.n_vendite && b.n_click){
        if(a.n_vendite > b.n_click)
          return -1;
        if(a.n_vendite < b.n_click)
          return 1;
      }
      else if(a.n_click && b.n_vendite){
        if(a.n_click > b.n_vendite)
          return -1;
        if(a.n_click < b.n_vendite)
          return 1;
      }
      else if(a.n_click && b.n_click){
        if(a.n_click > b.n_click)
          return -1;
        if(a.n_click < b.n_click)
          return 1;
      }
      return 0;
    })
    for(let delCount = 0; (this.eventListFilter.length > MAX_NUM_SLIDE) && MAX_NUM_SLIDE >= 0; delCount++){
      this.eventListFilter.pop();
    }
  }
}
