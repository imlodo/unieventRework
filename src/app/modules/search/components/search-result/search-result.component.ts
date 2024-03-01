// ... importi rimanenti ...

import { Component, OnInit } from "@angular/core";
import { ItemType } from "../../../../core/utility/global-constant";

@Component({
  selector: 'unievent-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  scrollDistance = 2;
  scrollUpDistance = 1;
  items: any[] = [];
  filteredItems: any[] = [];
  isLoading: boolean = false;
  selectedType: ItemType = ItemType.Tutte;
  ItemType: any = ItemType;

  protected getFirstAccount(items: any[], selectedType: ItemType): any[] {
    if (selectedType === ItemType.Tutte) {
        const accountItem = items.find(item => item.type === ItemType.Account);
        return accountItem ? [accountItem, ...items.filter(item => item.type !== ItemType.Account)] : items;
    }
    return [];
  }

  ngOnInit(): void {
    this.loadMoreItems();
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
      const newItems = Array.from({ length: 12 }, (_, index) => ({
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
    this.filteredItems = this.selectedType === ItemType.Tutte
      ? this.items
      : this.items.filter(item => item.type === this.selectedType);
  }

  changeType(type: ItemType) {
    this.selectedType = type;
    this.filterItemsByType();
  }

  private getRandomType(): ItemType {
    const types = Object.values(ItemType).filter(type => type !== ItemType.Tutte);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex] as ItemType;
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  
}

