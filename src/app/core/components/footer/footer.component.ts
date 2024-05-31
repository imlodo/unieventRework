import { AfterViewChecked, Component } from '@angular/core';
import { GlobalService } from '../../services';
import { Router } from '@angular/router';
import { ROUTE_LIST } from '../../utility/global-constant';

@Component({
  selector: 'unievent-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewChecked {
  currentYear: number = new Date().getFullYear();
  protected darkMode = false;

  constructor(private globalService: GlobalService, private router: Router){
    
  }

  ngAfterViewChecked(): void {
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === "0") {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
  }

  navigateToNewTicketSystem(){
    const params = this.globalService.encodeParams({
      ticket: true
    });
    this.router.navigate([ROUTE_LIST.supports.basepath, params]);
  }
}
