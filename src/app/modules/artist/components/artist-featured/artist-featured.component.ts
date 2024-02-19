import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-artist-featured',
  templateUrl: './artist-featured.component.html',
  styleUrls: ['./artist-featured.component.scss']
})
export class ArtistFeaturedComponent {

  constructor(private router: Router) {
  }

  goToAristList() {
    this.router.navigate([ROUTE_LIST.artist.list]);
  }

}
