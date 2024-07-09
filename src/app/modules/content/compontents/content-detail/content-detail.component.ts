import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { pluck } from 'rxjs';
import { GlobalService, UserService } from 'src/app/core/services';
import { ItemType, ROUTE_LIST } from 'src/app/core/utility/global-constant';
import { Comment } from '../../models/comment';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/core/services/contentService/content.service';
import { User } from 'src/app/core/models/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'unievent-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('messageInput') messageInput: ElementRef;
  @ViewChild('messageReplyInput') messageReplyInput: ElementRef;
  @ViewChild('rightPanelContainer') rightPanelContainer!: ElementRef;
  @ViewChild('replyPanel') replyPanel!: ElementRef;
  protected item: any = null;
  bgLeftPanel: string = null;
  ItemType: any = ItemType;
  commentValue: string = '';
  commentReplyValue: string = '';
  showEmoticonPanel: boolean = false;
  showEmoticonReplyPanel: boolean = false;
  showSharePanel: boolean = false;
  darkMode = false;
  currentLink: String = window.location.href;
  showChildrenCommentArray: Array<any> = [];
  commentNumberOnShow: number = 5;
  activeReplyComment: Comment = null;
  currentUser: User;
  comments: Comment[] = [];
  discussionIdReply: number = null;
  isReplyCommentArray: Array<boolean>;
  isFollowed: boolean = false;
  isBooked: boolean = false;
  isLiked: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private userService: UserService, private cookieService: CookieService,
    private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private contentService: ContentService) {
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.currentUser = JSON.parse(cookieCurrentUser);
    }
  }

  ngAfterViewChecked(): void {
    this.darkMode = localStorage.getItem("darkModeChoice") === "1";
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.cdr.detectChanges();
  }

  checkIsFollowedByCurrentUser() {
    this.userService.checkIsFollowedByCurrentUser(this.item.t_user.t_alias_generated, this.item.t_user.t_alias_generated).subscribe(
      response => {
        this.isFollowed = Boolean(response.follows);
      }
    );
  }

  checkIsBookedByCurrentUser() {
    this.contentService.checkContentIsBookedByCurrentUser(this.currentUser.t_alias_generated, this.item.id).subscribe(
      response => {
        this.isBooked = Boolean(response.booked);
      }
    );
  }

  checkIsLikedByCurrentUser() {
    this.contentService.checkContentIsLikedByCurrentUser(this.currentUser.t_alias_generated, this.item.id).subscribe(
      response => {
        this.isLiked = Boolean(response.liked);
      }
    );
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        this.contentService.getSingleContent(decode.item.id, decode.item.t_user.t_alias_generated).subscribe(
          (response: any) => {
            this.item = response;
            this.isReplyCommentArray = new Array(this.item.numOfComment).fill(false);
            this.checkIsFollowedByCurrentUser();
            this.checkIsBookedByCurrentUser();
            this.checkIsLikedByCurrentUser();
            this.getDiscussions();
            this.initialize();
          },
          error => {
            console.error('Errore nel recupero del contenuto:', error);
          }
        );
      }
      );
  }

  getDiscussions() {
    this.contentService.getContentDiscussions(this.item.id).subscribe(
      (response: any) => {
        this.comments = response;
        this.resetAddReply();
        console.log(response);
      },
      error => {
        console.error('Errore nel recupero del contenuto:', error);
      }
    );
  }

  getOtherActionLabel(discussion_lenght: number, showedComment: Array<Comment>) {

    return 'Visualizza ' + (discussion_lenght > 1 ? `${discussion_lenght - (showedComment ? showedComment.length : 0)} risposte` : '1 risposta');
  }

  showChildrenComment(comment: Comment) {
    let index = this.showChildrenCommentArray[comment.discussion_id] ? this.showChildrenCommentArray[comment.discussion_id].length : 0;
    const childrenToAdd = comment.children.slice(index, index + this.commentNumberOnShow);
    if (!this.showChildrenCommentArray[comment.discussion_id]) { this.showChildrenCommentArray[comment.discussion_id] = [] }
    this.showChildrenCommentArray[comment.discussion_id] = [...this.showChildrenCommentArray[comment.discussion_id], ...childrenToAdd];
  }

  initialize() {
    const background = document.querySelector('.background') as HTMLElement;

    if (background && this.item && this.item.t_image_link) {
      background.style.backgroundImage = `url(${this.item.t_image_link})`;
    }

    const contentElContainer = document.querySelector('.content-element-container') as HTMLElement;

    if (contentElContainer && this.item && this.item.t_video_link) {
      const videoPlayer = document.createElement('video') as HTMLVideoElement;
      videoPlayer.classList.add('video-canvas', 'custom-video-player', 'pointer');
      videoPlayer.style.inset = '0px';
      videoPlayer.style.boxSizing = 'border-box';
      videoPlayer.style.padding = '0px';
      videoPlayer.style.border = 'none';
      videoPlayer.style.margin = 'auto';
      videoPlayer.style.maxWidth = "500px";
      videoPlayer.style.minWidth = "500px";
      videoPlayer.style.display = 'block';
      videoPlayer.style.width = '100%'; // Imposta la larghezza al 100% del contenitore
      videoPlayer.style.height = '100%'; // Imposta l'altezza al 100% del contenitore
      videoPlayer.style.objectFit = 'cover'; // Copre l'intero contenitore mantenendo le proporzioni
      videoPlayer.controls = true; // Abilita i controlli del video
      videoPlayer.disablePictureInPicture = true; // Disabilita la funzione picture-in-picture
      videoPlayer.setAttribute('controlsList', 'nofullscreen nodownload noremoteplayback noplaybackrate');
      videoPlayer.innerText = 'Your browser does not support video'; // Testo di fallback nel caso il browser non supporti il video
      videoPlayer.src = this.item.t_video_link;
      videoPlayer.onclick = () => {
        if (videoPlayer.paused) {
          videoPlayer.play();
        } else {
          videoPlayer.pause();
        }
      }
      //videoPlayer.muted = true;
      contentElContainer.appendChild(videoPlayer);

      const playIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      playIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      playIcon.setAttribute("width", "100");
      playIcon.setAttribute("height", "100");
      playIcon.setAttribute("fill", "currentColor");
      playIcon.setAttribute("class", "bi bi-play-fill pointer");
      playIcon.setAttribute("viewBox", "0 0 16 16");
      playIcon.style.position = "absolute";
      playIcon.style.top = "50%";
      playIcon.style.left = "50%";
      playIcon.style.transform = "translate(-50%, -50%)";
      playIcon.innerHTML = '<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>';
      playIcon.addEventListener('click', () => {
        if (videoPlayer.paused) {
          videoPlayer.play();
        } else {
          videoPlayer.pause();
        }
      });
      contentElContainer.appendChild(playIcon);
      videoPlayer.onplay = () => {
        playIcon.style.display = "none";
      }
      videoPlayer.onpause = () => {
        playIcon.style.display = "block";
      }
      videoPlayer.play();
    }

    if (!this.item.t_video_link && this.item.t_image_link) {
      const img = document.createElement('img');
      img.src = this.item.t_image_link;
      img.alt = 'Fallback Image';
      img.style.width = '100%'; // Imposta la larghezza al 100% del contenitore
      img.style.height = '100%'; // Imposta l'altezza al 100% del contenitore
      img.style.maxWidth = "600px";
      img.style.minWidth = "600px";
      img.style.objectFit = 'cover'; // Copre l'intero contenitore mantenendo le proporzioni
      contentElContainer.appendChild(img);
    }
  }

  navigateToBack() {
    window.history.back();
  }

  navigateToUserProfile(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated;
    this.router.navigate([link]);
  }

  formatDateString(dateString: string): string {
    moment.locale('en'); // Imposta la lingua italiana

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

  navigateToBuyTicket() {
    const params = this.globalService.encodeParams({
      n_id: this.item.id
    });
    this.router.navigate([ROUTE_LIST.event.detail, params]);
  }

  addLike(item: any) {
    this.contentService.addLikeByType(this.currentUser.t_alias_generated, item.id, null, "LIKE_CONTENT").subscribe(
      (response: any) => {
        this.isLiked = response.liked;
        if (response.liked)
          item.like_count += 1;
        else
          item.like_count -= 1;
        this.toastr.clear();
        this.toastr.success(response.message)
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nell\'aggiunta del like');
      }
    );
  }

  addDiscussionLike(item: any) {
    this.contentService.addLikeByType(this.currentUser.t_alias_generated, this.item.id, item.discussion_id, "LIKE_DISCUSSION").subscribe(
      (response: any) => {
        item.is_liked_by_current_user = response.liked;
        if (response.liked)
          item.like_count += 1;
        else
          item.like_count -= 1;
        this.toastr.clear();
        this.toastr.success(response.message)
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nell\'aggiunta del like');
      }
    );
  }

  book(item: any) {
    this.contentService.addContentBooked(this.currentUser.t_alias_generated, item.id).subscribe(
      (response: any) => {
        this.isBooked = response.booked;
        this.toastr.clear();
        this.toastr.success(response.message);
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore nell\' aggiunta del contento ai preferiti');
      }
    );
  }

  closeSharePanel() {
    this.showSharePanel = false;
  }

  openSharePanel() {
    this.showSharePanel = true;
  }

  shareOnWhatsApp() {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`;
    window.open(whatsappUrl, '_blank');
  }

  shareOnTelegram() {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`;
    window.open(telegramUrl, '_blank');
  }

  shareOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(facebookUrl, '_blank');
  }

  addComment() {
    if (this.commentValue.length > 0) {
      this.contentService.addContentDiscussion(this.item.id, null, this.commentValue, null).subscribe(
        (response: any) => {
          this.comments.push(response.discussion);
          this.item.numOfComment += 1;
          this.commentValue = "";
          this.scrollToBottom();
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Errore nell\'aggiunta del commento');
      });      
    }
  }

  addReplyComment(comment: Comment) {
    if (this.currentUser.t_alias_generated === this.activeReplyComment.t_user.t_alias_generated) { 
      this.toastr.clear();
      this.toastr.warning(null, "Non puoi rispondere a te stesso", { progressBar: true });
      this.resetAddReply();
      return;
    }
    if (this.commentReplyValue.length > 0) {
      this.contentService.addContentDiscussion(this.item.id, this.activeReplyComment.discussion_id , this.commentReplyValue, this.activeReplyComment.t_user.t_alias_generated).subscribe(
        (response: any) => {
          comment.children = comment.children ? [...comment.children, response.discussion] : [response.discussion];
          this.commentReplyValue = null;
          this.item.numOfComment += 1;
          //this.scrollToBottomReply();
          this.resetAddReply();
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Errore nell\'aggiunta del commento');
      });    
    }
  }

  resetAddReply() {
    this.isReplyCommentArray = [...this.isReplyCommentArray.map(el => false)]
    this.commentReplyValue = "";
    this.activeReplyComment = null;
    this.closeEmoticonReplyPanel();
  }

  openEmoticonPanel() {
    this.showEmoticonPanel = !this.showEmoticonPanel;
  }

  openReplyEmoticonPanel() {
    this.showEmoticonReplyPanel = !this.showEmoticonReplyPanel;
  }

  closeEmoticonReplyPanel() {
    this.showEmoticonReplyPanel = false;
  }

  closeEmoticonPanel() {
    this.showEmoticonPanel = false;
  }

  addEmoticonToChat(emoji: string) {
    const inputElement = this.messageInput.nativeElement;
    const currentCursorPosition = inputElement.selectionStart;
    this.commentValue = `${this.commentValue.slice(0, currentCursorPosition)}${emoji}${this.commentValue.slice(currentCursorPosition)}`;
    inputElement.setSelectionRange(this.commentValue.length, this.commentValue.length);
    inputElement.focus();
  }

  addEmoticonToReplyChat(emoji: string) {
    const inputElement = this.messageReplyInput.nativeElement;
    const currentCursorPosition = inputElement.selectionStart;
    this.commentReplyValue = `${this.commentReplyValue.slice(0, currentCursorPosition)}${emoji}${this.commentReplyValue.slice(currentCursorPosition)}`;
    inputElement.setSelectionRange(this.commentReplyValue.length, this.commentReplyValue.length);
    inputElement.focus();
  }

  focusComment() {
    const messageInput = document.querySelector('.message-input') as HTMLElement;
    if (messageInput) {
      // Mette a fuoco l'elemento
      messageInput.focus();
    }
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.rightPanelContainer.nativeElement.scrollTop = this.rightPanelContainer.nativeElement.scrollHeight;
    }, 0)
  }

  scrollToBottomReply() {
    setTimeout(() => {
      this.replyPanel.nativeElement.scrollTop = this.replyPanel.nativeElement.scrollHeight;
    }, 0)
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

  followUser() {
    this.userService.followUser(this.item.t_user.t_alias_generated, this.item.t_user.t_alias_generated)
      .subscribe(
        response => {
          this.toastr.clear();
          this.toastr.success(response.message);
          this.isFollowed = true;
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Errore nel seguire l\'utente');
        }
      );
  }

  openDiscussionReplyPanel(comment: Comment, childComment: Comment) {
    this.isReplyCommentArray = [...this.isReplyCommentArray.map(el => false)]
    this.isReplyCommentArray[comment.discussion_id] = true;
    this.activeReplyComment = childComment ? childComment : comment;
    this.commentReplyValue = '';
  }
}
