import { AfterViewChecked, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-featured-topic',
  templateUrl: './featured-topic.component.html',
  styleUrls: ['./featured-topic.component.scss']
})
export class FeaturedTopicComponent implements AfterViewChecked {
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

  goToTopicList() {
    const params = this.globalService.encodeParams({
      searchType: "Topics"
    });
    this.router.navigate([ROUTE_LIST.search.result, params]);
  }
}
