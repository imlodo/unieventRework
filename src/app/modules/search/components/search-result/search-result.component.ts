import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { pluck } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { GlobalService } from 'src/app/core/services';
import { randomIntFromInterval } from 'src/app/core/utility/functions-constants';
import { ItemType, ROUTE_LIST, USER_TYPE } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements AfterViewInit {
  @ViewChild('scrollableContent') scrollableContent: ElementRef;
  bodyElement: ElementRef;
  user: User;
  isLoading: boolean = false;
  scrollDistance = 1;
  scrollUpDistance = 1;
  ItemType: any = ItemType;
  currentGifLoading = 'assets/img/loader_white.gif';
  artistContentList: any[] = [];
  eventContentList: any[] = [];
  topicContentList: any[] = [];
  userContentList: any[] = [];
  allContentList: any[] = [];
  searchInput: string = null;
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
  selectedType: ItemType = ItemType.Tutti;
  countAccounts: number = 1; //questi devono essere precaricati dal back-end che ci dice quanti account sono stati trovati
  countArtists: number = 1;  //questi devono essere precaricati dal back-end che ci dice quanti artisti sono stati trovati

  constructor(private cdr: ChangeDetectorRef, private cookieService: CookieService, private elementRef: ElementRef, private renderer: Renderer2, private globalService: GlobalService, private route: ActivatedRoute, private router: Router) {

    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.user = JSON.parse(cookieCurrentUser);
    }
    this.bodyElement = this.elementRef.nativeElement.ownerDocument.body;
    this.loadMoreItems(ItemType.Tutti);
    this.isLoading = false;
    this.loadMoreItems(ItemType.Artisti);
    this.isLoading = false;
    this.loadMoreItems(ItemType.Eventi);
    this.isLoading = false;
    this.loadMoreItems(ItemType.Topics);
    this.isLoading = false;
    this.loadMoreItems(ItemType.Utenti);
    this.decodeParams();
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

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  navigateToBuyTicket(event: any, item: any) {
    event.preventDefault();
    const params = this.globalService.encodeParams({
      n_id: item.id
    });
    this.router.navigate([ROUTE_LIST.event.detail, params]);
  }

  changeType(type: ItemType) {
    this.selectedType = type;
  }

  protected getLastTwoAccounts(items: any[], type: ItemType.Artisti | ItemType.Utenti): any[] {
    const utentiAccounts = items
      .filter(item => item.type === ItemType.Utenti && (type === ItemType.Artisti ? item.t_type === 0 : item.t_type > 0))
      .slice(-2);
    return utentiAccounts;
  }

  private generateRandomEvent(index: number, lenghtArray: number): any { //Event
    const randomIntValue = randomIntFromInterval(0, 1);
    return {
      id: lenghtArray + index,
      t_caption: this.didascalie[Math.floor(Math.random() * this.didascalie.length)],
      t_image_link: randomIntValue === 0 ? '/assets/img/exampleEventFirstFrame.png' : '/assets/img/event-image-placeholder.jpg',
      t_video_link: randomIntValue === 0 ? '/assets/videos/exampleEventVideo.mp4' : null,
      t_event_date: new Date(), // Imposta la data dell'evento secondo le tue esigenze
      t_user: this.generateRandomAccount(index, lenghtArray),
      n_click: randomIntFromInterval(1, 10000000),
      type: ItemType.Eventi,
      created_date: this.generateRandomDate(),
      event_first_date: this.generateRandomNextTodayDate(),
      event_last_date: this.generateRandomNextTodayDate()
    };
  }

  private generateRandomTopics(index: number, lenghtArray: number): any { //Topic
    const randomIntValue = randomIntFromInterval(0, 1);
    return {
      id: lenghtArray + index,
      t_caption: this.didascalie[Math.floor(Math.random() * this.didascalie.length)],
      t_image_link: randomIntValue === 0 ? '/assets/img/exampleTopicImageFristFrame.png' : '/assets/img/topic-image-placeholder.jpg',
      t_video_link: randomIntValue === 0 ? '/assets/videos/exampleTopicsVideo.mp4' : null,
      t_topic_date: new Date(), // Imposta la data del topic secondo le tue esigenze
      t_user: this.generateRandomAccount(index, lenghtArray),
      n_click: randomIntFromInterval(1, 10000000),
      type: ItemType.Topics,
      created_date: this.generateRandomDate()
    };
  }

  private generateRandomAccount(index: number, lenghtArray: number): any { //Account
    const randomAccountType = randomIntFromInterval(1, 3) === 1 ? USER_TYPE.ARTIST : randomIntFromInterval(1, 3) === 2 ? USER_TYPE.COMPANY : USER_TYPE.CREATOR;
    return {
      id: lenghtArray + index,
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

  private generateRandomUser(index: number, lenghtArray: number): any { //Account
    const randomAccountType = randomIntFromInterval(1, 3) === 1 ? USER_TYPE.ARTIST : randomIntFromInterval(1, 3) === 2 ? USER_TYPE.COMPANY : USER_TYPE.CREATOR;
    return {
      id: lenghtArray + index,
      t_name: `Name ${index + 1}`,
      t_follower_number: 1705,
      t_alias_generated: `Alias${index + 1}`,
      t_description: "Ti aiutiamo a diventare la versione migliore di TE STESSO! Seguici su Instagram.",
      t_profile_photo: randomAccountType === 0 ? '/assets/img/example_artist_image.jpg' : "/assets/img/userExampleImg.jpeg",
      t_type: randomAccountType,
      is_verified: false,
      type: ItemType.Utenti
    };
  }

  private generateRandomArtist(index: number, lenghtArray: number): any { //Account
    const randomAccountType = randomIntFromInterval(1, 3) === 1 ? USER_TYPE.ARTIST : randomIntFromInterval(1, 3) === 2 ? USER_TYPE.COMPANY : USER_TYPE.CREATOR;
    return {
      id: lenghtArray + index,
      t_name: `Name ${index + 1}`,
      t_follower_number: 1705,
      t_alias_generated: `Alias${index + 1}`,
      t_description: "Ti aiutiamo a diventare la versione migliore di TE STESSO! Seguici su Instagram.",
      t_profile_photo: randomAccountType === 0 ? '/assets/img/example_artist_image.jpg' : "/assets/img/userExampleImg.jpeg",
      t_type: randomAccountType,
      is_verified: true,
      type: ItemType.Utenti
    };
  }

  private loadMoreItems(itemType: ItemType) {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      if (itemType === ItemType.Tutti) {
        for (let i = 0; i < 25; i++) {
          let type = this.getRandomType();
          switch (type) {
            case ItemType.Artisti:
              this.artistContentList = [...this.artistContentList, ...[this.generateRandomArtist(i, this.artistContentList.length)]];
              break;
            case ItemType.Utenti:
              this.userContentList = [...this.userContentList, ...[this.generateRandomUser(i, this.userContentList.length)]];
              break;
            case ItemType.Eventi:
              this.eventContentList = [...this.eventContentList, ...[this.generateRandomEvent(i, this.eventContentList.length)]];
              break;
            case ItemType.Topics:
              this.topicContentList = [...this.topicContentList, ...[this.generateRandomTopics(i, this.topicContentList.length)]];
              break;
          }
        }
        this.allContentList = this.shuffleArray([...this.eventContentList, ...this.topicContentList]);
      } else {
        const newItems = Array.from({ length: 25 }, (_, index) => {
          switch (itemType) {
            case ItemType.Artisti:
              return this.generateRandomArtist(index, this.artistContentList.length);
            case ItemType.Utenti:
              return this.generateRandomUser(index, this.userContentList.length);
            case ItemType.Eventi:
              return this.generateRandomEvent(index, this.eventContentList.length);
            case ItemType.Topics:
              return this.generateRandomTopics(index, this.topicContentList.length);
            default:
              break;
          }
        });
        if (itemType === ItemType.Artisti) {
          this.artistContentList = [...this.artistContentList, ...newItems];
        }
        if (itemType === ItemType.Eventi) {
          this.eventContentList = [...this.eventContentList, ...newItems];
        }
        if (itemType === ItemType.Topics) {
          this.topicContentList = [...this.topicContentList, ...newItems];
        }
        if (itemType === ItemType.Utenti) {
          this.userContentList = [...this.userContentList, ...newItems];
        }

        this.allContentList = this.shuffleArray([...this.eventContentList, ...this.topicContentList]);
      }

      this.isLoading = false;
    }, 1);
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  navigateToUserProfile(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated;
    this.router.navigate([link]);
  }

  private getRandomType(): ItemType {
    const types = Object.values(ItemType).filter(type => type !== ItemType.Tutti);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex] as ItemType;
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

  navigateToContent(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated + "/content";
    const params = this.globalService.encodeParams({
      item: item
    });
    this.router.navigate([link, params]);
  }

  onScroll(itemType: ItemType) {
    this.loadMoreItems(itemType);
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  formatDateString(dateString: string): string {
    moment.locale('it');

    const currentDate = moment();
    const formattedDate = moment(dateString);

    if (formattedDate.isBefore(currentDate, 'day')) {
      return formattedDate.format('DD MMMM YYYY [alle] HH:mm');
    } else {
      return formattedDate.format('DD MMMM YYYY');
    }
  }

  simulateClickOnBody() {
    const bodyElement = document.querySelector('body');
    const clickEvent = new Event('click');
    bodyElement.dispatchEvent(clickEvent);
  }

  onContextMenu(event: MouseEvent): void {
    //event.preventDefault();
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

  getLinkNavigateToItem(item: any) {
    return window.location.href;
  }

  searchByLookedFor(lookedValue: string) {
  }

}

