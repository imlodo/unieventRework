import { AfterViewChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-artist-featured',
  templateUrl: './artist-featured.component.html',
  styleUrls: ['./artist-featured.component.scss']
})
export class ArtistFeaturedComponent implements AfterViewChecked {
  currentYear: number = new Date().getFullYear();
  protected darkMode = false;

  constructor(private router: Router, private globalService: GlobalService) {
  }

  ngAfterViewChecked(): void {
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === "0") {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
  }

  goToAristList() {
    const params = this.globalService.encodeParams({
      searchType: "Artisti"
    });
    this.router.navigate([ROUTE_LIST.search.result, params]);
  }

}
