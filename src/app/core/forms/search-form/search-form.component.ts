import { Component } from '@angular/core';
import cityJson from "../../../../assets/json/city.json";

@Component({
  selector: 'unievent-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  
  selectedCity: number;
  selectedEventType: number;
  city = this.getInitialCity();
  tipoEventoArray = [];
  dynamicClass = [];

  getInitialCity(){
    let tmpCities= Object.values(cityJson).filter(el=> el["Flag Comune capoluogo di provincia"] === 1);
    tmpCities = tmpCities.sort((a,b)=>{
      if(a["Denominazione in italiano"].toLowerCase() < b["Denominazione in italiano"].toLowerCase()) { return -1; }
      if(a["Denominazione in italiano"].toLowerCase() > b["Denominazione in italiano"].toLowerCase()) { return 1; }
      return 0;
    });
    return tmpCities;
  }

  goToAdvancedSearch(){

  }

  addFocusClass(field:string){
    if(field === 't_search_input'){
      this.dynamicClass[field] = "explode-icon-search";
    } else{
      this.dynamicClass[field] = "explode-span";
    }
  }

  removeFocusClass(field:string){
    this.dynamicClass[field] = "";
  }
}
