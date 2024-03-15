import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { ItemType, ROUTE_LIST, USER_TYPE } from "../../../../core/utility/global-constant";
import { GlobalService } from "src/app/core/services";
import { ActivatedRoute, Router } from "@angular/router";
import { pluck } from "rxjs";
import { randomIntFromInterval } from "src/app/core/utility/functions-constants";
import moment from "moment";
import 'moment/locale/it'; // Importa la localizzazione italiana di moment

@Component({
  selector: 'unievent-content-infinite-scroll',
  templateUrl: './content-infinite-scroll.component.html',
  styleUrls: ['./content-infinite-scroll.component.scss']
})
export class ContentInfiniteScrollComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('cardElement', { static: false }) cardElement!: ElementRef<HTMLDivElement>;
  currentPlayingVideo: HTMLVideoElement = null;
  intersectionObserver: IntersectionObserver;
  scrollDistance = 2;
  scrollUpDistance = 1;
  items: any[] = [];
  filteredItems: any[] = [];
  isLoading: boolean = false;
  selectedType: ItemType = ItemType.Tutti;
  ItemType: any = ItemType;
  searchInput: string = null;
  isMuted: boolean = true;
  volumeLevel: number = 0.5; // livello predefinito del volume
  countAccounts: number = 1; //questi devono essere precaricati dal back-end che ci dice quanti account sono stati trovati
  countArtists: number = 1;  //questi devono essere precaricati dal back-end che ci dice quanti artisti sono stati trovati
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
    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startVideo(entry.target as HTMLElement);
        } else {
          this.stopVideo(entry.target as HTMLElement);
        }
      });
    });
    // Seleziona tutti gli elementi card e osserva ognuno di essi
    setTimeout(() => {
      const cardElements = document.querySelectorAll('.picture-container');
      console.log(cardElements)
      cardElements.forEach(cardElement => {
        this.intersectionObserver.observe(cardElement);
      });
    }, 1);

    this.cdr.detectChanges();
  }

  private startVideo(target: HTMLElement) {
    const video = target.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.autoplay = true;
      video.muted = this.isMuted; // Assicura che tutti i video siano inizialmente muted
      video.volume = this.volumeLevel;
      video.addEventListener('volumechange', () => {
        // Quando viene rimosso il muted, applica questa modifica a tutti i video successivi
        if (!video.muted) {
          this.applyUnmuteToSubsequentVideos();
          this.volumeLevel = video.volume; // salva il livello del volume quando viene modificato
        }
      });
      if (this.currentPlayingVideo && this.currentPlayingVideo !== video) {
        // Ferma il video attualmente in riproduzione
        this.stopVideo(this.currentPlayingVideo.parentElement);
      }
      // Avvia il nuovo video con un piccolo ritardo per assicurarsi che sia visibile completamente
      setTimeout(() => {
        if (this.currentPlayingVideo === video) {
          this.simulateClickOnBody();
          video.play();
        }
      }, 1); // Regola il ritardo a seconda delle tue esigenze
      this.currentPlayingVideo = video as HTMLVideoElement;
    }
}

private applyUnmuteToSubsequentVideos() {
  this.isMuted = false;
}
  // Modifica il metodo stopVideo
  private stopVideo(target: HTMLElement) {
    const video = target.querySelector('video');
    if (video) {
      (video as HTMLVideoElement).pause();
      // Resetta la variabile currentPlayingVideo se il video in pausa è quello attualmente in riproduzione
      if (this.currentPlayingVideo === video) {
        this.currentPlayingVideo = null;
      }
    }
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
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

  navigateToUserProfile(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated;
    this.router.navigate([link]);
  }

  addLike(item: any) {
    alert("LIKE")
  }

  addComment(item: any) {
    alert("COMMENT")
  }

  share(item: any) {
    alert("SHARE")
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
      t_video_link: randomIntValue === 0 ? 'https://media.istockphoto.com/id/1144640568/it/video/loperaio-spinge-bottiglie-di-plastica-con-una-pala-per-il-riciclaggio-lavorare-in-una.mp4?s=mp4-640x640-is&k=20&c=zeB2A9MHShH9jFSThzmTm3tCnBOFSahY7OEai63HQDM=' : null,
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

  navigateToContent(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated + "/content";
    const params = this.globalService.encodeParams({
      id: item.id,
    });
    this.router.navigate([link, params]);
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


}