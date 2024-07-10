import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { ExploreItemType, ItemType, ROUTE_LIST } from '../../../../core/utility/global-constant';
import { GlobalService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import moment from 'moment';
import { pluck } from 'rxjs';
import { MORE_CONTENT_TYPE } from 'src/app/core/utility/enum-constant';
import { ContentService } from 'src/app/core/services/contentService/content.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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
  user: User;
  scrollDistance = 1;
  scrollUpDistance = 1;
  bodyElement: ElementRef;
  currentGifLoading = 'assets/img/loader_white.gif';
  currentAllPageNumber: number = 1;
  currentFollowedPageNumber: number = 1;
  currentFeaturedPageNumber: number = 1;
  currentEventsPageNumber: number = 1;
  currentTopicsPageNumber: number = 1;
  pageSize: number = 5;
  showSharePanel: boolean = false;
  currentLink: String = "";

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private toastr: ToastrService, private cookieService: CookieService,
    private globalService: GlobalService, private route: ActivatedRoute, private router: Router, private contentService: ContentService) {
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.user = JSON.parse(cookieCurrentUser);
    }
    this.bodyElement = this.elementRef.nativeElement.ownerDocument.body;
  }

  ngAfterViewInit() {
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

  initialize() {
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

  navigateToBuyTicket(event: any, item: any) {
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
    this.isLoading = true;

    let moreContentType: MORE_CONTENT_TYPE = null;
    let pageNumber: number = 1;
    switch (exploreItemType) {
      case ExploreItemType.All:
        moreContentType = MORE_CONTENT_TYPE.EXPLORE_ALL;
        pageNumber = this.currentAllPageNumber + 1;
        this.currentAllPageNumber += 1;
        break;
      case ExploreItemType.Featured:
        moreContentType = MORE_CONTENT_TYPE.EXPLORE_FEATURED;
        pageNumber = this.currentFeaturedPageNumber + 1;
        this.currentFeaturedPageNumber += 1;
        break;
      case ExploreItemType.Followed:
        moreContentType = MORE_CONTENT_TYPE.EXPLORE_FOLLOWED;
        pageNumber = this.currentFollowedPageNumber + 1;
        this.currentFollowedPageNumber += 1;
        break;
      case ExploreItemType.Events:
        moreContentType = MORE_CONTENT_TYPE.EXPLORE_EVENTS;
        pageNumber = this.currentEventsPageNumber + 1;
        this.currentEventsPageNumber += 1;
        break;
      case ExploreItemType.Topics:
        moreContentType = MORE_CONTENT_TYPE.EXPLORE_TOPICS;
        pageNumber = this.currentTopicsPageNumber + 1;
        this.currentTopicsPageNumber += 1;
        break;
    }

    this.contentService.getMoreContent(null, this.user.t_alias_generated, moreContentType, "created_date", "DESC", pageNumber, this.pageSize).subscribe(
      (response: any) => {
        if (exploreItemType === ExploreItemType.All) {
          if (response.content_list.length > 0) {
            this.allContentList = [...this.allContentList, ...response.content_list];
          }
        }
        if (exploreItemType === ExploreItemType.Events) {
          if (response.content_list.length > 0) {
            this.eventsContentList = [...this.eventsContentList, ...response.content_list];
          }
        }
        if (exploreItemType === ExploreItemType.Topics) {
          if (response.content_list.length > 0) {
            this.topicsContentList = [...this.topicsContentList, ...response.content_list];
          }
        }
        if (exploreItemType === ExploreItemType.Featured) {
          if (response.content_list.length > 0) {
            this.featuredContentList = [...this.featuredContentList, ...response.content_list];
          }
        }
        if (exploreItemType === ExploreItemType.Followed) {
          if (response.content_list.length > 0) {
            this.followedContentList = [...this.followedContentList, ...response.content_list];
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
    this.contentService.addLikeByType(this.user.t_alias_generated, item.id, null, "LIKE_CONTENT").subscribe(
      (response: any) => {
        item.is_liked_by_current_user = response.liked;
        if (response.liked)
          item.numOfLike += 1;
        else
          item.numOfLike -= 1;
        this.toastr.clear();
        this.toastr.success(response.message)
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nell\'aggiunta del like');
      }
    );
  }

  closeSharePanel() {
    this.showSharePanel = false;
  }

  openSharePanel(item:any) {
    this.showSharePanel = true;
    this.currentLink = this.generatePath(item);
  }

  generatePath(item: any): string {
    const link = "/@/" + item.t_user.t_alias_generated + "/content";
    const params = this.globalService.encodeParams({
      item: item
    });
    const fullPath =  window.location.origin + this.router.serializeUrl(this.router.createUrlTree([link,params]));
    return fullPath;
  }

  shareOnWhatsApp() {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(String(this.currentLink))}`;
    window.open(whatsappUrl, '_blank');
  }

  shareOnTelegram() {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(String(this.currentLink))}`;
    window.open(telegramUrl, '_blank');
  }

  shareOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(String(this.currentLink))}`;
    window.open(facebookUrl, '_blank');
  }

  copyToClipboard() {
    const tempInput = document.createElement('input');
    tempInput.value = this.currentLink as string;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

}
