import { Component, EventEmitter, Output } from '@angular/core';
import cityJson from "../../../../assets/json/city.json";

@Component({
  selector: 'unievent-search-collapse',
  templateUrl: './search-collapse.component.html',
  styleUrls: ['./search-collapse.component.scss']
})
export class SearchCollapseComponent {
  selectedCar: number;
  isShow:boolean = false;
  city = this.getInitialCity();
  @Output() onHideSearch: EventEmitter<void> = new EventEmitter();

  hideSearch(){
    this.onHideSearch.emit();
  }

  getInitialCity(){
    let tmpCities= Object.values(cityJson).filter(el=> el["Flag Comune capoluogo di provincia"] === 1);
    tmpCities = tmpCities.sort((a,b)=>{
      if(a["Denominazione in italiano"].toLowerCase() < b["Denominazione in italiano"].toLowerCase()) { return -1; }
      if(a["Denominazione in italiano"].toLowerCase() > b["Denominazione in italiano"].toLowerCase()) { return 1; }
      return 0;
    });
    return tmpCities;
  }
}
