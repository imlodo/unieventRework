import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { ExploreItemType, ItemType, ROUTE_LIST } from '../../../../core/utility/global-constant';
import { GlobalService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import moment from 'moment';
import { ContentService } from 'src/app/core/services/contentService/content.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'unievent-content-infinite-scroll',
  templateUrl: './content-infinite-scroll.component.html',
  styleUrls: ['./content-infinite-scroll.component.scss']
})
export class ContentInfiniteScrollComponent {
  ExploreItemType: any = ExploreItemType;
  ItemType: any = ItemType;
  selectedType: ExploreItemType = ExploreItemType.All;
  allContentList: Array<any> = new Array();
  isLoading: boolean = false;
  user: User;
  scrollDistance = 1;
  scrollUpDistance = 1;
  bodyElement: ElementRef;
  currentGifLoading = 'assets/img/loader_white.gif';
  pageNumber: number = 1;
  pageSize: number = 5;
  showSharePanel: boolean = false;
  currentLink: String = "";
  currentPlayingVideo: HTMLVideoElement;
  isMuted: boolean = false;
  volumeLevel: number = 0.5;
  intersectionObserver: IntersectionObserver;

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private toastr: ToastrService, private cookieService: CookieService,
    private globalService: GlobalService, private route: ActivatedRoute, private router: Router, private contentService: ContentService) {
    this.simulateClickOnBody();
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.user = JSON.parse(cookieCurrentUser);
    }
    this.bodyElement = this.elementRef.nativeElement.ownerDocument.body;
    this.loadMoreItems();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  trackByFn(index: number, item: any): number {
    return item.id;
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

  onScroll() {
    this.loadMoreItems();
  }

  private loadMoreItems() {
    this.isLoading = true;

    this.contentService.getMoreContentBasedOnCurrentUser("created_date", "DESC", this.pageNumber, this.pageSize).subscribe(
      (response: any) => {
        this.allContentList = [...this.allContentList, ...response.content_list];
        this.pageNumber += 1;
        this.isLoading = false;
        this.simulateClickOnBody();
        this.addObserver();
      },
      error => {
        console.error('Errore nel recupero dei contenuti:', error);
        this.isLoading = false;
      }
    );
  }

  private addObserver() {
    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startVideo(entry.target as HTMLElement);
        } else {
          this.stopVideo(entry.target as HTMLElement);
        }
      });
    });
    setTimeout(() => {
      const cardElements = document.querySelectorAll('.picture-container');
      cardElements.forEach(cardElement => {
        this.intersectionObserver.observe(cardElement);
      });
    }, 1);
  }

  private startVideo(target: HTMLElement) {
    this.simulateClickOnBody();
    const video = target.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.currentTime = 0;
      video.autoplay = true;
      video.loop = true;
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

  openSharePanel(item: any) {
    this.showSharePanel = true;
    this.currentLink = this.generatePath(item);
  }

  generatePath(item: any): string {
    const link = "/@/" + item.t_user.t_alias_generated + "/content";
    const params = this.globalService.encodeParams({
      item: item
    });
    const fullPath = window.location.origin + this.router.serializeUrl(this.router.createUrlTree([link, params]));
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