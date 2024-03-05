import { AfterViewChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-event-near',
  templateUrl: './event-near.component.html',
  styleUrls: ['./event-near.component.scss']
})
export class EventNearComponent implements AfterViewChecked {
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
  
  goToNearEvent() {
    const params = this.globalService.encodeParams({
      filter: { actionType: 'near_event', position: "posizione"},
      searchType: "Eventi"
    });
    this.router.navigate([ROUTE_LIST.search.result, params]);
  }
}
