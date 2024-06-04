import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { ExploreItemType, ItemType, ROUTE_LIST, USER_TYPE } from '../../../../core/utility/global-constant';
import { GlobalService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { randomIntFromInterval } from 'src/app/core/utility/functions-constants';
import { User } from 'src/app/core/models/user';
import moment from 'moment';
import { pluck } from 'rxjs';

@Component({
  selector: 'unievent-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  ExploreItemType: any = ExploreItemType;
  ItemType: any = ItemType;
  selectedType: ExploreItemType = ExploreItemType.All;
  allContentList: Array<any> = new Array();
  eventsContentList: Array<any> = new Array();
  topicsContentList: Array<any> = new Array();
  featuredContentList: Array<any> = new Array();
  followedContentList: Array<any> = new Array();
  isLoading: boolean = false;
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
  user: User = {
    t_name: "Mario",
    t_surname: "Baldi",
    t_alias_generated: "mariobaldi1",
    t_description: "Sono un bel ragazzo",
    t_profile_photo: "/assets/img/userExampleImg.jpeg",
    is_verified: true,
    t_type: USER_TYPE.CREATOR
  }
  scrollDistance = 1;
  scrollUpDistance = 1;
  bodyElement: ElementRef;
  currentGifLoading = 'assets/img/loader_white.gif';

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private renderer: Renderer2, private globalService: GlobalService, private route: ActivatedRoute, private router: Router) {
    this.bodyElement = this.elementRef.nativeElement.ownerDocument.body;
  }

  ngAfterViewInit(){
    this.decodeParams();
    this.cdr.detectChanges();
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        this.selectedType = decode.exploreItemType;
        this.initialize();
      }
      );
  }

  initialize(){
    this.loadMoreItems(this.selectedType);
  }

  changeType(type: ExploreItemType) {
    this.selectedType = type;
    if (
      (type === ExploreItemType.All && this.allContentList.length === 0) ||
      (type === ExploreItemType.Followed && this.followedContentList.length === 0) ||
      (type === ExploreItemType.Events && this.eventsContentList.length === 0) ||
      (type === ExploreItemType.Topics && this.topicsContentList.length === 0) ||
      (type === ExploreItemType.Featured && this.featuredContentList.length === 0)
    ) {
      this.loadMoreItems(type);
    }
  }

  trackByFn(index: number, item: any): number {
    return item.id;
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

  navigateToBuyTicket(event:any, item:any) {
    event.preventDefault();
    const params = this.globalService.encodeParams({
      n_id: item.id
    });
    this.router.navigate([ROUTE_LIST.event.detail, params]);
  }

  navigateToUserProfile(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated;
    this.router.navigate([link]);
  }

  formatDateString(dateString: string): string {
    moment.locale('it'); // Imposta la lingua italiana

    const currentDate = moment();
    const formattedDate = moment(dateString);
    const diffInHours = currentDate.diff(formattedDate, 'hours');
    const diffInDays = currentDate.diff(formattedDate, 'days');

    if (diffInHours < 24) {
      if (diffInHours <= 1) {
        return 'meno di un\'ora fa';
      } else {
        return `${diffInHours} ore fa`;
      }
    } else {
      if (diffInDays <= 1) {
        return 'ieri';
      } else {
        return `${diffInDays} giorni fa`;
      }
    }
  }

  onScroll(exploreItemType: ExploreItemType) {
    this.loadMoreItems(exploreItemType);
  }

  private loadMoreItems(exploreItemType: ExploreItemType) {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, index) => {
        if(exploreItemType === ExploreItemType.Topics){
          return this.generateRandomTopics(index);
        }
        if(exploreItemType === ExploreItemType.Events){
          return this.generateRandomEvent(index);
        }
        const type = this.getRandomType();
        switch (type) {
          case ItemType.Eventi:
            return this.generateRandomEvent(index);
          default:
            return this.generateRandomTopics(index);
        }
      });
      if (exploreItemType === ExploreItemType.All) {
        this.allContentList = [...this.allContentList, ...newItems];
      } else if (exploreItemType === ExploreItemType.Events) {
        this.eventsContentList = [...this.eventsContentList, ...newItems];
      } else if (exploreItemType === ExploreItemType.Topics) {
        this.topicsContentList = [...this.topicsContentList, ...newItems];
      } else if (exploreItemType === ExploreItemType.Featured) {
        this.featuredContentList = [...this.featuredContentList, ...newItems];
      } else if (exploreItemType === ExploreItemType.Followed) {
        this.followedContentList = [...this.followedContentList, ...newItems];
      }
      this.isLoading = false;
    }, 1);
  }

  private getRandomType(): ItemType {
    const types = Object.values(ItemType).filter(type => type !== ItemType.Tutti && type !== ItemType.Artisti);
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

  private generateRandomEvent(index: number): any { //Event
    const randomIntValue = randomIntFromInterval(0, 1);
    return {
      id: index,
      t_caption: this.didascalie[Math.floor(Math.random() * this.didascalie.length)],
      t_image_link: randomIntValue === 0 ? '/assets/img/exampleEventFirstFrame.png' : '/assets/img/event-image-placeholder.jpg',
      t_video_link: randomIntValue === 0 ? '/assets/videos/exampleEventVideo.mp4' : null,
      t_event_date: new Date(), // Imposta la data dell'evento secondo le tue esigenze
      t_user: this.user,
      n_click: randomIntFromInterval(1, 10000000),
      type: ItemType.Eventi,
      created_date: this.generateRandomDate(),
      event_first_date: this.generateRandomNextTodayDate(),
      event_last_date: this.generateRandomNextTodayDate()
    };
  }

  private generateRandomTopics(index: number): any { //Topic
    const randomIntValue = randomIntFromInterval(0, 1);
    return {
      id: index,
      t_caption: this.didascalie[Math.floor(Math.random() * this.didascalie.length)],
      t_image_link: randomIntValue === 0 ? '/assets/img/exampleTopicImageFristFrame.png' : '/assets/img/topic-image-placeholder.jpg',
      t_video_link: randomIntValue === 0 ? '/assets/videos/exampleTopicsVideo.mp4' : null,
      t_topic_date: new Date(), // Imposta la data del topic secondo le tue esigenze
      t_user: this.user,
      n_click: randomIntFromInterval(1, 10000000),
      type: ItemType.Topics,
      created_date: this.generateRandomDate()
    };
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

  simulateClickOnBody() {
    const bodyElement = document.querySelector('body');
    const clickEvent = new Event('click');
    bodyElement.dispatchEvent(clickEvent);
  }

  onContextMenu(event: MouseEvent): void {
    //event.preventDefault();
  }

  navigateToContent(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated + "/content";
    const params = this.globalService.encodeParams({
      item: item
    });
    this.router.navigate([link, params]);
  }


  addLike(item: any) {
    alert("LIKE")
  }

  book(item: any) {
    alert("SHARE")
  }

  addComment(item: any) {
    
  }

}
