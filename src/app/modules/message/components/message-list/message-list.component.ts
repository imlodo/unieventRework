import { AfterViewChecked, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'unievent-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements AfterViewChecked {
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
}
