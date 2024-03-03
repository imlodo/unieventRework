import { Component, Input } from '@angular/core';
import cityJson from "../../../../assets/json/city.json";
import { Router } from '@angular/router';
import { EVENT_TYPE, EVENT_TYPE_ARRAY, ROUTE_LIST, TOPIC_TYPE_ARRAY } from '../../utility/global-constant';
import { GlobalService } from '../../services';
import moment from 'moment';

@Component({
  selector: 'unievent-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {

  selectedCity: number;
  whenFilter: string = null;
  searchInputValue: string = '';
  selectedEventType: number;
  selectedTopicType: number;
  city = this.getInitialCity();
  tipoEventoArray = EVENT_TYPE_ARRAY;
  tipoTopicArray = TOPIC_TYPE_ARRAY;
  dynamicClass = [];
  searchType: string = "Tutti";
  @Input() darkMode: boolean;

  constructor(private router: Router, private globalService: GlobalService) {
  }

  getInitialCity() {
    let tmpCities = Object.values(cityJson).filter(el => el["Flag Comune capoluogo di provincia"] === 1);
    tmpCities = tmpCities.sort((a, b) => {
      if (a["Denominazione in italiano"].toLowerCase() < b["Denominazione in italiano"].toLowerCase()) { return -1; }
      if (a["Denominazione in italiano"].toLowerCase() > b["Denominazione in italiano"].toLowerCase()) { return 1; }
      return 0;
    });
    return tmpCities;
  }

  onDateChange(event: any) {
    // Assicurati che la data sia valida prima di assegnarla a whenFilter
    if (event.target.value) {
      const selectedDate = new Date(event.target.value);
      this.whenFilter = selectedDate.toISOString().split('T')[0]; // Converti in stringa con formato "yyyy-MM-dd"
    } else {
      this.whenFilter = null;
    }
  }

  navigateToSearch() {
    let filter = null;
    if(this.searchType === 'Eventi'){
      filter = {
        selectedCity: this.selectedCity,
        whenFilter: this.whenFilter ? moment(this.whenFilter).format("DD/MM/YYYY") : null,
        eventType: this.selectedEventType
      }
    } else if(this.searchType === 'Topics'){
      filter = {
        whenFilter: this.whenFilter ? moment(this.whenFilter).format("DD/MM/YYYY") : null,
        topicType: this.selectedTopicType
      }
    }
    const params = this.globalService.encodeParams({
      searchInput: this.searchInputValue,
      filter: filter,
      searchType: this.searchType
    });
    this.router.navigate([ROUTE_LIST.search.result, params]);
  }

  goToAdvancedSearch() {
    this.router.navigate([ROUTE_LIST.search.advanced]);
  }

  addFocusClass(field: string) {
    if (field === 't_search_input') {
      this.dynamicClass[field] = "explode-icon-search";
    } else {
      this.dynamicClass[field] = "explode-span";
    }
  }
  removeFocusClass(field: string) {
    this.dynamicClass[field] = "";
  }
}
