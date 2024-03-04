// ... importi rimanenti ...

import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { ItemType, USER_TYPE } from "../../../../core/utility/global-constant";
import { GlobalService } from "src/app/core/services";
import { ActivatedRoute, Router } from "@angular/router";
import { pluck } from "rxjs";
import { randomIntFromInterval } from "src/app/core/utility/functions-constants";

@Component({
  selector: 'unievent-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements AfterViewInit, AfterViewChecked {
  private isViewInitialized = false;
  @ViewChildren('canvasImage') canvasImages: QueryList<ElementRef>;
  @ViewChildren('canvasImage') set contentChildrenQueryList(contentChildren: QueryList<ElementRef>) {
    if (!this.isViewInitialized) { return; }
    this.canvasImages = contentChildren;
    this.updateCanvasImages();
  }
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
    this.isViewInitialized = true;
    this.decodeParams();
    this.loadMoreItems();
    this.cdr.detectChanges();
  }

  protected getFirstAccount(items: any[], selectedType: ItemType): any[] {
    if (selectedType === ItemType.Tutti) {
      const UtentiItem = items.find(item => item.type === ItemType.Utenti);
      return UtentiItem ? [UtentiItem] : [];
    }
    return [];
  }

  ngAfterViewChecked(): void {
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === "0") {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
  }

  onScroll(type:ItemType) {
    //Bisogna parametrizzare la funziona perchè in base a dove si scrolla carica solo elementi di un dato tipo (questo devi farlo anche per il resto del codice)
    
    this.loadMoreItems();
  }

  private loadMoreItems() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const newItems = Array.from({ length: 25 }, (_, index) => {
        const type = this.getRandomType();
        switch (type) {
          case ItemType.Utenti:
            return this.generateRandomAccount(index);
          case ItemType.Eventi:
            return this.generateRandomEvent(index);
          case ItemType.Topic:
            return this.generateRandomTopic(index);
          case ItemType.Artisti:
            return this.generateRandomArtist(index);
          default:
            break;
        }
      });
      this.items = [...this.items, ...newItems];
      console.log(this.items)
      this.filterItemsByType();
      this.isLoading = false;
    }, 1);
  }

  private generateRandomAccount(index: number): any { //Account
    return {
      id: this.items.length + index,
      t_name: `Name ${index + 1}`,
      t_follower_number: 1705,
      t_alias_generated: `Alias${index + 1}`,
      t_description: "Ti aiutiamo a diventare la versione migliore di TE STESSO! Seguici su Instagram.",
      t_profile_photo: `https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/ed421b60e29f4c55293ba224762e93a3~c5_100x100.jpeg?lk3s=30310797&x-expires=1709539200&x-signature=CdvtqZQWZGU0Ob9ufwu0fF7HjH4%3D`,
      t_type: USER_TYPE.CUSTOMER || USER_TYPE.COMPANY,
      type: ItemType.Utenti
    };
  }

  private generateRandomEvent(index: number): any { //Event
    return {
      id: this.items.length + index,
      t_title: `Event Title ${index + 1}`,
      t_image_link: `/assets/img/event-image-placeholder.jpg`,
      t_event_date: new Date(), // Imposta la data dell'evento secondo le tue esigenze
      t_user:{
        id: this.items.length + index,
        t_name: `Name ${index + 1}`,
        t_follower_number: 1705,
        t_alias_generated: `Alias${index + 1}`,
        t_description: "Ti aiutiamo a diventare la versione migliore di TE STESSO! Seguici su Instagram.",
        t_profile_photo: `https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/ed421b60e29f4c55293ba224762e93a3~c5_100x100.jpeg?lk3s=30310797&x-expires=1709539200&x-signature=CdvtqZQWZGU0Ob9ufwu0fF7HjH4%3D`,
        t_type: USER_TYPE.COMPANY
      },
      n_click: randomIntFromInterval(1,10000000),
      type: ItemType.Eventi
    };
  }

  private generateRandomTopic(index: number): any { //Topic

    return {
      id: this.items.length + index,
      t_title: `Topic Title ${index + 1}`,
      t_image_link: `/assets/img/topic-image-placeholder.jpg`,
      t_topic_date: new Date(), // Imposta la data del topic secondo le tue esigenze
      t_user:{
        id: this.items.length + index,
        t_name: `Name ${index + 1}`,
        t_follower_number: 1705,
        t_alias_generated: `Alias${index + 1}`,
        t_description: "Ti aiutiamo a diventare la versione migliore di TE STESSO! Seguici su Instagram.",
        t_profile_photo: `https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/ed421b60e29f4c55293ba224762e93a3~c5_100x100.jpeg?lk3s=30310797&x-expires=1709539200&x-signature=CdvtqZQWZGU0Ob9ufwu0fF7HjH4%3D`,
        t_type: USER_TYPE.COMPANY || USER_TYPE.CUSTOMER
      },
      n_click: randomIntFromInterval(1,10000000),
      type: ItemType.Topic
    };
  }

  private generateRandomArtist(index: number): any { //EventArtist
    return {
      id: this.items.length + index,
      t_name: `Artist Name ${index + 1}`,
      t_image_link: `/assets/img/artist-image-placeholder.jpg`,
      t_alias: `Alias${index + 1}`,
      t_desc: `Description for Artist ${index + 1}`,
      n_click: randomIntFromInterval(1,10000000),
      type: ItemType.Artisti
    };
  }

  private filterItemsByType() {
    this.filteredItems = this.selectedType === ItemType.Tutti
      ? this.items
      : this.items.filter(item => item.type === this.selectedType);
    this.updateCanvasImages();
  }

  changeType(type: ItemType) {
    this.selectedType = type;
    this.filterItemsByType();
  }

  getLinkNavigateToItem(item: any){
    return window.location.href;
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

  private updateCanvasImages() {
    if (!this.canvasImages) {
      return;
    }
  
    this.filteredItems.forEach(item => {
      if (item.t_image_link) {
        const canvasId = `canvasImage_${item.id}`;
        const canvasElement = this.canvasImages.toArray().find(c => c.nativeElement.id === canvasId)?.nativeElement;
        if (canvasElement) {
          this.loadImage(item.t_image_link, canvasElement);
        }
      }
    });
  }

  private loadImage(imageUrl: string, canvas: HTMLCanvasElement) {
    const context: CanvasRenderingContext2D = canvas.getContext('2d');
  
    const image = new Image();
    image.src = imageUrl;
  
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  
    // Impedisci il menu contestuale quando si fa clic destro sul canvas
    /*canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });*/
  }

  searchByLookedFor(lookedValue: string) {
  }

}

