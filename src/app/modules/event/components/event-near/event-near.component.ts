import { AfterViewChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-event-near',
  templateUrl: './event-near.component.html',
  styleUrls: ['./event-near.component.scss']
})
export class EventNearComponent implements AfterViewChecked {
  currentYear: number = new Date().getFullYear();
  protected darkMode = false;

  constructor(private router: Router) {
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
    this.router.navigate([ROUTE_LIST.event.near.list]);
  }
}
