import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { pluck } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { GlobalService } from 'src/app/core/services';
import { ContentService } from 'src/app/core/services/contentService/content.service';
import { MORE_CONTENT_TYPE } from 'src/app/core/utility/enum-constant';
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
  artistContentList: Array<any> = new Array();
  eventContentList: Array<any> = new Array();
  topicContentList: Array<any> = new Array();
  userContentList: Array<any> = new Array();
  allContentList: Array<any> = new Array();
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
  selectedType: ItemType = ItemType.Tutti;
  countAccounts: number = 1; //questi devono essere precaricati dal back-end che ci dice quanti account sono stati trovati
  countArtists: number = 1;  //questi devono essere precaricati dal back-end che ci dice quanti artisti sono stati trovati
  currentAllPageNumber: number = 1;
  currentUserPageNumber: number = 1;
  currentArtistPageNumber: number = 1;
  currentEventsPageNumber: number = 1;
  currentTopicsPageNumber: number = 1;
  pageSize: number = 5;

  constructor(private cdr: ChangeDetectorRef, private cookieService: CookieService, private elementRef: ElementRef, private contentService: ContentService,
    private renderer: Renderer2, private globalService: GlobalService, private route: ActivatedRoute, private router: Router) {

    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.user = JSON.parse(cookieCurrentUser);
    }
    this.bodyElement = this.elementRef.nativeElement.ownerDocument.body;
    this.loadMoreItems(ItemType.Tutti);
    this.isLoading = false;
    this.loadMoreItems(ItemType.Utenti);
    this.isLoading = false;
    this.loadMoreItems(ItemType.Artisti);
    this.isLoading = false;
    this.loadMoreItems(ItemType.Eventi);
    this.isLoading = false;
    this.loadMoreItems(ItemType.Topics);
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

  protected getLastTwoAccounts(items: any[]): any[] {
    return items.slice(-2);
  }

  private loadMoreItems(itemType: ItemType) {
    this.isLoading = true;

    let moreContentType: MORE_CONTENT_TYPE = null;
    let pageNumber: number = 1;
    switch (itemType) {
      case ItemType.Tutti:
        moreContentType = MORE_CONTENT_TYPE.SEARCH_ALL;
        pageNumber = this.currentAllPageNumber + 1;
        this.currentAllPageNumber += 1;
        break;
      case ItemType.Utenti:
        moreContentType = MORE_CONTENT_TYPE.SEARCH_USER;
        pageNumber = this.currentUserPageNumber + 1;
        this.currentUserPageNumber += 1;
        break;
      case ItemType.Artisti:
        moreContentType = MORE_CONTENT_TYPE.SEARCH_ARTIST;
        pageNumber = this.currentArtistPageNumber + 1;
        this.currentArtistPageNumber += 1;
        break;
      case ItemType.Eventi:
        moreContentType = MORE_CONTENT_TYPE.SEARCH_EVENTS;
        pageNumber = this.currentEventsPageNumber + 1;
        this.currentEventsPageNumber += 1;
        break;
      case ItemType.Topics:
        moreContentType = MORE_CONTENT_TYPE.SEARCH_TOPICS;
        pageNumber = this.currentTopicsPageNumber + 1;
        this.currentTopicsPageNumber += 1;
        break;
    }

    this.contentService.getMoreContent(null, this.user.t_alias_generated, moreContentType, "created_date", "DESC", pageNumber, this.pageSize).subscribe(
      (response: any) => {
        if (itemType === ItemType.Tutti) {
          if (response.content_list.length > 0) {
            this.allContentList = [...this.allContentList, ...response.content_list];
          }
        }
        if (itemType === ItemType.Eventi) {
          if (response.content_list.length > 0) {
            this.eventContentList = [...this.eventContentList, ...response.content_list];
          }
        }
        if (itemType === ItemType.Topics) {
          if (response.content_list.length > 0) {
            this.topicContentList = [...this.topicContentList, ...response.content_list];
          }
        }
        if (itemType === ItemType.Utenti) {
          if (response.content_list.length > 0) {
            this.userContentList = [...this.userContentList, ...response.content_list];
          }
        }
        if (itemType === ItemType.Artisti) {
          if (response.content_list.length > 0) {
            this.artistContentList = [...this.artistContentList, ...response.content_list];
          }
        }
        this.isLoading = false;
      },
      error => {
        console.error('Errore nel recupero dei contenuti:', error);
      }
    );

    this.isLoading = false;
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

