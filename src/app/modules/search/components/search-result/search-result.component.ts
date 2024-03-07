import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { ItemType, USER_TYPE } from "../../../../core/utility/global-constant";
import { GlobalService } from "src/app/core/services";
import { ActivatedRoute, Router } from "@angular/router";
import { pluck } from "rxjs";
import { randomIntFromInterval } from "src/app/core/utility/functions-constants";
import moment from "moment";
import 'moment/locale/it'; // Importa la localizzazione italiana di moment

@Component({
  selector: 'unievent-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements AfterViewInit, AfterViewChecked {
  scrollDistance = 2;
  scrollUpDistance = 1;
  items: any[] = [];
  filteredItems: any[] = [];
  isLoading: boolean = false;
  selectedType: ItemType = ItemType.Tutti;
  ItemType: any = ItemType;
  searchInput: string = null;
  didascalie = [
    'Evento emozionante', 'Esperienza indimenticabile', 'Avventura entusiasmante', 'Momenti avvincenti',
    'Una serata da ricordare', 'Raduno magico', 'Spettacolo spettacolare', 'Celebrazione della comunità',
    'Simposio ispiratore', 'Estravaganza culturale', 'Performance mozzafiato', 'Vetrina artistica',
    'Laboratorio interattivo', 'Concerto epico', 'Forum educativo', 'Festività all\'aperto',
    'Mostra innovativa', 'Simposio creativo', 'Esposizione divertente', 'Occasione speciale',
    'Conferenza dinamica', 'Incontro sociale', 'Esperienza di realtà virtuale', 'Presentazione unica',
    'Vertice tecnologico', 'Estravaganza di moda', 'Ritiro benessere', 'Scoperta di nuovi orizzonti',
    'Viaggio musicale', 'Vetrina artigianale', 'Evento di networking globale', 'Intrattenimento sbalorditivo',
    'Seminario impattante', 'Festival gastronomico', 'Iniziativa eco-friendly', 'Delizie epicuree',
    'Esplorazione di nuovi fronti', 'Campionamento del cambiamento', 'Performance teatrale', 'Gemme nascoste rivelate',
    'Celebrare la diversità', 'Avventura gastronomica', 'Simposio futuristico', 'Delizie culinarie',
    'Esperienza interattiva', 'Idee rivoluzionarie', 'Sotto i riflettori dei talenti emergenti'
  ];
  currentGifLoading = 'assets/img/loader_white.gif';
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
    this.loadMoreItems();
    this.cdr.detectChanges();
  }

  onContextMenu(event: MouseEvent): void {
    //event.preventDefault();
  }

  navigateToBuyTicket() {
    alert("xd")
  }

  simulateClickOnBody() {
    const bodyElement = document.querySelector('body');
    const clickEvent = new Event('click');
    bodyElement.dispatchEvent(clickEvent);
  }

  protected getLastTwoAccounts(items: any[], type: ItemType.Artisti | ItemType.Utenti): any[] {
    const utentiAccounts = items
      .filter(item => item.type === ItemType.Utenti && (type === ItemType.Artisti ? item.t_type === 0 : item.t_type > 0))
      .slice(-2);
    return utentiAccounts;
  }

  ngAfterViewChecked(): void {
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === "0") {
      this.currentGifLoading = 'assets/img/loader_black.gif';
    } else {
      this.currentGifLoading = 'assets/img/loader_white.gif';
    }
  }

  onScroll(type: ItemType) {
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
          case ItemType.Topics:
            return this.generateRandomTopics(index);
          default:
            break;
        }
      });
      this.items = [...this.items, ...newItems];
      this.filterItemsByType();
      this.isLoading = false;
    }, 1);
  }

  navigateToUserProfile(id:number){
    
  }

  private generateRandomAccount(index: number): any { //Account
    const randomAccountType = randomIntFromInterval(1, 3) === 1 ? USER_TYPE.ARTIST : randomIntFromInterval(1, 3) === 2 ? USER_TYPE.COMPANY : USER_TYPE.CREATOR;
    return {
      id: this.items.length + index,
      t_name: `Name ${index + 1}`,
      t_follower_number: 1705,
      t_alias_generated: `Alias${index + 1}`,
      t_description: "Ti aiutiamo a diventare la versione migliore di TE STESSO! Seguici su Instagram.",
      t_profile_photo: randomAccountType === 0 ? '/assets/img/example_artist_image.jpg' : "/assets/img/userExampleImg.jpeg",
      t_type: randomAccountType,
      is_verified: randomIntFromInterval(0, 5) > 3 ? true : false,
      type: ItemType.Utenti
    };
  }

  generateRandomDate(): Date {
    const today = new Date();
    const randomNumberOfDays = Math.floor(Math.random() * 30); // Puoi regolare il numero di giorni come preferisci
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() - randomNumberOfDays);
    return randomDate;
  }

  generateRandomNextTodayDate(): Date {
    const today = new Date();
    const randomNumberOfDays = Math.floor(Math.random() * 30); // Puoi regolare il numero di giorni come preferisci
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() + randomNumberOfDays);
    return randomDate;
  }

  private generateRandomEvent(index: number): any { //Event
    const randomIntValue = randomIntFromInterval(0, 1);
    return {
      id: this.items.length + index,
      t_caption: this.didascalie[Math.floor(Math.random() * this.didascalie.length)],
      t_image_link: randomIntValue === 0 ? '/assets/img/exampleEventFirstFrame.png' : '/assets/img/event-image-placeholder.jpg',
      t_video_link: randomIntValue === 0 ? '/assets/videos/exampleEventVideo.mp4' : null,
      t_event_date: new Date(), // Imposta la data dell'evento secondo le tue esigenze
      t_user: this.generateRandomAccount(index),
      n_click: randomIntFromInterval(1, 10000000),
      type: ItemType.Eventi,
      created_date: this.generateRandomDate(),
      event_first_date: this.generateRandomNextTodayDate(),
      event_last_date: this.generateRandomNextTodayDate()
    };
  }

  formatDateString(dateString: string): string {
    moment.locale('it'); // Imposta la lingua italiana

    const currentDate = moment();
    const formattedDate = moment(dateString);

    if (formattedDate.isBefore(currentDate, 'day')) {
      return formattedDate.format('DD MMMM YYYY [alle] HH:mm');
    } else {
      return formattedDate.format('DD MMMM YYYY');
    }
  }

  private generateRandomTopics(index: number): any { //Topic
    const randomIntValue = randomIntFromInterval(0, 1);
    return {
      id: this.items.length + index,
      t_caption: this.didascalie[Math.floor(Math.random() * this.didascalie.length)],
      t_image_link: randomIntValue === 0 ? '/assets/img/exampleTopicImageFristFrame.png' : '/assets/img/topic-image-placeholder.jpg',
      t_video_link: randomIntValue === 0 ? '/assets/videos/exampleTopicsVideo.mp4' : null,
      t_topic_date: new Date(), // Imposta la data del topic secondo le tue esigenze
      t_user: this.generateRandomAccount(index),
      n_click: randomIntFromInterval(1, 10000000),
      type: ItemType.Topics,
      created_date: this.generateRandomDate()
    };
  }

  private filterItemsByType() {
    this.filteredItems = this.selectedType === ItemType.Tutti
      ? this.items
      : this.selectedType === ItemType.Artisti ? this.items.filter(item => item.t_type === 0)
        : this.selectedType === ItemType.Utenti ? this.items.filter(item => item.t_type > 0)
          : this.items.filter(item => item.type === this.selectedType);
  }

  changeType(type: ItemType) {
    this.selectedType = type;
    this.filterItemsByType();
  }

  getLinkNavigateToItem(item: any) {
    return window.location.href;
  }

  private getRandomType(): ItemType {
    const types = Object.values(ItemType).filter(type => type !== ItemType.Tutti && type !== ItemType.Artisti);
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
        this.selectedType = ItemType.Topics;
        break;
      case "Utenti":
        this.selectedType = ItemType.Utenti;
        break;
    }
  }

  searchByLookedFor(lookedValue: string) {
  }


  onMouseEnter(item: any) {
    if (item.t_video_link) {
      this.startVideo(item, item.id, item.t_video_link);
    }
  }

  onMouseLeave(item: any) {
    if (item.t_video_link) {
      const canvas = document.getElementById(`canvas_${item.id}`) as HTMLCanvasElement;
      this.stopVideo(canvas, item.t_image_link);
    }
  }

  private startVideo(item: any, itemId: number, videoLink: string) {
    this.simulateClickOnBody();
    const canvas = document.getElementById(`canvas_${itemId}`) as HTMLCanvasElement;
    if (canvas) {
      const video = document.createElement('video');
      video.id = `video_${itemId}`;
      video.src = videoLink;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;

      // Aggiungi il video e il canvas come attributi dei dati
      canvas['videoElement'] = video;
      canvas['videoId'] = `video_${itemId}`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        const drawFrame = () => {
          if (!video.paused && !video.ended) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
          }
        };

        video.addEventListener('loadedmetadata', () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          drawFrame();
        });
      }
      video.play();
    }
  }

  private stopVideo(canvas: HTMLCanvasElement, imageLink: string) {
    const video = canvas['videoElement'] as HTMLVideoElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.remove();
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const defaultImage = new Image();
      defaultImage.src = imageLink; // Assicurati che t_image_link contenga l'URL dell'immagine di default
      ctx.drawImage(defaultImage, 0, 0, canvas.width, canvas.height);
    }
  }

}

