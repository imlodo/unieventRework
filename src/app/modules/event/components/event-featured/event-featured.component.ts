import { AfterViewChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-event-featured',
  templateUrl: './event-featured.component.html',
  styleUrls: ['./event-featured.component.scss']
})
export class EventFeaturedComponent implements AfterViewChecked {
  constructor(private router: Router, private globalService: GlobalService) {
  }

  protected darkMode = false;

  ngAfterViewChecked(): void {
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === "0") {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
  }

  goToFeaturedEvent() {
    const params = this.globalService.encodeParams({
      filter: { actionType: 'featured_event' },
      searchType: "Eventi"
    });
    this.router.navigate([ROUTE_LIST.search.result, params]);
  }

}
