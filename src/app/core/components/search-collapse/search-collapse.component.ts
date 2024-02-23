import { AfterViewChecked, Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'unievent-search-collapse',
  templateUrl: './search-collapse.component.html',
  styleUrls: ['./search-collapse.component.scss']
})
export class SearchCollapseComponent implements AfterViewChecked{
  isShow:boolean = false;
  protected darkMode = false;
  @Output() onHideSearch: EventEmitter<void> = new EventEmitter();

  hideSearch(){
    this.onHideSearch.emit();
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
