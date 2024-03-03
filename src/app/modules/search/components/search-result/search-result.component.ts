// ... importi rimanenti ...

import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ItemType } from "../../../../core/utility/global-constant";
import { GlobalService } from "src/app/core/services";
import { ActivatedRoute, Router } from "@angular/router";
import { pluck } from "rxjs";

@Component({
  selector: 'unievent-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, AfterViewChecked {
  scrollDistance = 2;
  scrollUpDistance = 1;
  items: any[] = [];
  filteredItems: any[] = [];
  isLoading: boolean = false;
  selectedType: ItemType = ItemType.Tutti;
  ItemType: any = ItemType;
  searchInput: string = null;
  lookedForArray = [
    "Esame De Prisco",
    "Discoteca tropicale",
    "Superamento esame Cloud",
    "Wine Music",
    "Ladies Night"
  ];
  protected darkMode = false;
  protected decodedParams: {
    searchInput: string;
    filter: {
      selectedCity?: string;
      whenFilter: string;
      eventType?: number,
      topicType?: number
    };
    searchType: string;
  } = null;

  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.cdr.detectChanges();
  }

  protected getFirstAccount(items: any[], selectedType: ItemType): any[] {
    if (selectedType === ItemType.Tutti) {
      const UtentiItem = items.find(item => item.type === ItemType.Utenti);
      return UtentiItem ? [UtentiItem, ...items.filter(item => item.type !== ItemType.Utenti)] : items;
    }
    return [];
  }

  ngOnInit(): void {
    this.loadMoreItems();
  }

  ngAfterViewChecked(): void {
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === "0") {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
  }

  onScroll() {
    this.loadMoreItems();
  }

  private loadMoreItems() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const newItems = Array.from({ length: 100 }, (_, index) => ({
        id: this.items.length + index,
        content: `Item ${this.items.length + index + 1}`,
        type: this.getRandomType(),
      }));
      this.items = [...this.items, ...newItems];
      this.filterItemsByType();
      this.isLoading = false;
    }, 500);
  }

  private filterItemsByType() {
    this.filteredItems = this.selectedType === ItemType.Tutti
      ? this.items
      : this.items.filter(item => item.type === this.selectedType);
  }

  changeType(type: ItemType) {
    this.selectedType = type;
    this.filterItemsByType();
  }

  private getRandomType(): ItemType {
    const types = Object.values(ItemType).filter(type => type !== ItemType.Tutti);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex] as ItemType;
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        this.decodedParams = decode;
        this.initialize();
      }
      );
  }

  initialize() {
    this.searchInput = this.decodedParams.searchInput;
    console.log(this.decodedParams.searchType)
    switch (this.decodedParams.searchType) {
      case "Tutti":
        this.selectedType = ItemType.Tutti;
        break;
      case "Eventi":
        this.selectedType = ItemType.Eventi;
        break;
      case "Topics":
        this.selectedType = ItemType.Topic;
        break;
      case "Artisti":
        this.selectedType = ItemType.Artisti;
        break;
      case "Utenti":
        this.selectedType = ItemType.Utenti;
        break;
    }
    if (this.decodedParams.searchType === "Evento") {

    } else if (this.decodedParams.searchType === "Topic") {

    }
  }

  searchByLookedFor(lookedValue: string) {
  }

}

