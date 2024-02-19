import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-featured-topic',
  templateUrl: './featured-topic.component.html',
  styleUrls: ['./featured-topic.component.scss']
})
export class FeaturedTopicComponent {
  constructor(private router: Router) {
  }

  goToTopicList() {
    this.router.navigate([ROUTE_LIST.topic.featured.list]);
  }
}
