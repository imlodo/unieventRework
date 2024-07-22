import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { pluck, } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { GlobalService, UserService } from 'src/app/core/services';
import { ContentService } from 'src/app/core/services/contentService/content.service';
import { MORE_CONTENT_TYPE } from 'src/app/core/utility/enum-constant';
import { ItemType, ProfileItemType, ROUTE_LIST } from 'src/app/core/utility/global-constant';
import { FileUploadService } from 'src/app/modules/content/services/file-upload-service/file-upload-service';

@Component({
  selector: 'unievent-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements AfterViewInit {
  @ViewChild('scrollableContent') scrollableContent: ElementRef;
  ProfileItemType: any = ProfileItemType;
  ItemType: any = ItemType;
  bodyElement: ElementRef;
  showEditPanel: boolean = false;
  isFollowed: boolean = false; // Vale per l'utente corrente che visita il profilo
  isFollowRequest: boolean = false;
  isLoading: boolean = false;
  username: string = "";
  firstName: string = "";
  lastName: string = "";
  biography: string = "";
  profile_photo: string = "";
  currentGifLoading: string = 'assets/img/loader_white.gif';
  user: User;  //User recuperato dal backend
  currentUser: User;
  scrollDistance = 1;
  scrollUpDistance = 1;
  showBooked: boolean = false;
  items: any[] = [];
  currentContentPageNumber: number = 1;
  currentLikedPageNumber: number = 1;
  currentBookedPageNumber: number = 1;
  pageSize: number = 5;
  userInfo: any;
  selectedType: ProfileItemType = ProfileItemType.Content;
  isPrivateAccount: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private toastr: ToastrService, private contentService: ContentService,
    private userService: UserService, private cookieService: CookieService, private elementRef: ElementRef,
    private globalService: GlobalService, private route: ActivatedRoute, private router: Router, private fileService: FileUploadService) {
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.currentUser = JSON.parse(cookieCurrentUser);
    }
    this.simulateClickOnBody();
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        if (result) {
          const decode = this.globalService.decodeParams(result);
          if (decode.profileItemType === "Booked") {
            this.selectedType = ProfileItemType.Booked;
          }
          if (decode.profileItemType === "Liked") {
            this.selectedType = ProfileItemType.Liked;
          }
          if (decode.profileItemType === "Content") {
            this.selectedType = ProfileItemType.Content;
          }
        }
      }
      );
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      const userAliasGenerated = params.get('userAliasGenerated');
      if (userAliasGenerated) {
        this.userService.getUser(userAliasGenerated).subscribe(
          (response: any) => {
            this.user = response.user;
            this.userService.getProfileUserSettings(this.user.t_alias_generated,null).subscribe(
              (response: any) => {
                this.isPrivateAccount = response.privacy.visibility.private_account;
                this.showBooked = response.privacy.visibility.show_booked;
              },
              error => {
                this.toastr.clear();
                this.toastr.error('Errore nel recupero delle impostazioni');
              });
            this.getUserProfileInfoByUsername();
            this.checkIsFollowedByCurrentUser();
            this.checkIsFollowRequestByCurrentUser();
            this.bodyElement = this.elementRef.nativeElement.ownerDocument.body;
            this.username = this.user.t_alias_generated;
            this.firstName = this.user.t_name;
            this.lastName = this.user.t_surname;
            this.biography = this.user.t_description;
            this.profile_photo = this.user.t_profile_photo;
            this.decodeParams();
            this.isLoading = false;
          },
          error => {
          }
        );
      } else {
      }
    });
    this.cdr.detectChanges();
  }

  navigateToBuyTicket(event: any, item: any) {
    event.preventDefault();
    const params = this.globalService.encodeParams({
      n_id: item.id
    });
    this.router.navigate([ROUTE_LIST.event.detail, params]);
  }


  getUserProfileInfoByUsername() {
    this.userService.getUserProfileInfo(this.user.t_alias_generated).subscribe(
      (response: any) => {
        this.userInfo = response.user_profile_info;
      },
      error => {
      }
    );
  }

  checkIsFollowedByCurrentUser() {
    this.userService.checkIsFollowedByCurrentUser(this.currentUser.t_alias_generated, this.user.t_alias_generated).subscribe(
      response => {
        this.isFollowed = Boolean(response.follows);
      }
    );
  }

  checkIsFollowRequestByCurrentUser() {
    this.userService.checkIsFollowRequestByCurrentUser(this.currentUser.t_alias_generated, this.user.t_alias_generated).subscribe(
      response => {
        this.isFollowRequest = Boolean(response.followRequest);
      }
    );
  }

  sanitizeFirstName(): void {
    this.firstName = this.sanitizeInput(this.firstName);
  }

  sanitizeLastName(): void {
    this.lastName = this.sanitizeInput(this.lastName);
  }

  sanitizeInput(input: string): string {
    return input.replace(/[^a-zA-ZàáâäèéêëìíîïòóôöùúûüçÀÁÂÄÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜÇ\s]/g, '');
  }


  changeType(type: ProfileItemType) {
    this.selectedType = type;
  }

  navigateToUserProfile(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated;
    this.router.navigate([link]);
  }

  followThisUserByCurrentUser() {
    this.toastr.clear()
    if (this.isPrivateAccount) {
      this.userService.sendFollowUserRequest(this.currentUser.t_alias_generated, this.user.t_alias_generated)
        .subscribe(
          response => {
            this.toastr.success(response.message);
            this.isFollowRequest = true;
          },
          error => {
            this.toastr.error('Errore nell\'invio della richiesta di seguire l\'utente');
          }
      );
    } else {
      this.userService.followUser(this.currentUser.t_alias_generated, this.user.t_alias_generated)
        .subscribe(
          response => {
            this.toastr.success(response.message);
            this.userInfo.countFollower += 1;
            this.isFollowed = true;
          },
          error => {
            this.toastr.error('Errore nel seguire l\'utente');
          }
        );
    }
  }

  unfollowUser() {
    this.toastr.clear()
    this.userService.unfollowUser(this.user.t_alias_generated)
      .subscribe(
        response => {
          this.toastr.success(response.message);
          this.userInfo.countFollower -= 1;
          this.isFollowed = false;
        },
        error => {
          this.toastr.error('Errore nel seguire l\'utente');
        }
      );
  }

  unReqFollowUser(){
    this.toastr.clear()
    this.userService.unReqFollowUser(this.user.t_alias_generated)
      .subscribe(
        response => {
          this.toastr.success(response.message);
          this.isFollowRequest = false;
        },
        error => {
          this.toastr.error('Errore nell\'eliminare la richiesta di seguire l\'utente');
        }
      );
  }

  openEditProfilePanel() {
    this.showEditPanel = true;
  }

  cancelEdit(): void {
    this.showEditPanel = false;
    this.resetFormFields();
  }

  saveChanges(): void {
    this.showEditPanel = false;
    this.user.t_name = this.firstName;
    this.user.t_surname = this.lastName;
    this.user.t_description = this.biography;
    this.user.t_profile_photo = this.profile_photo;

    this.userService.editUser(this.firstName, this.lastName, this.biography, this.profile_photo, null, null).subscribe(
      response => {
        this.toastr.success(response.message)
      },
      error => {
        this.toastr.error(error.error);
      }
    );

  }

  resetFormFields(): void {
    this.username = this.user.t_alias_generated;
    this.firstName = this.user.t_name;
    this.lastName = this.user.t_surname;
    this.biography = this.user.t_description;
    this.profile_photo = this.user.t_profile_photo;
  }

  onBiographyInput(event: any): void {
    if (this.biography.length > 250) {
      this.biography = this.biography.slice(0, 250);
    }
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.fileService.uploadFileAzure(selectedFile).subscribe(event => {
        this.profile_photo = event.body.url;
        this.user.t_profile_photo = event.body.url;
      }, error => {
      });
    }
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

  onScroll(profileItemType: ProfileItemType) {

    this.isLoading = true;

    let moreContentType: MORE_CONTENT_TYPE = null;
    let pageNumber: number = 1;
    switch (profileItemType) {
      case ProfileItemType.Content:
        moreContentType = MORE_CONTENT_TYPE.PROFILE_CONTENT;
        pageNumber = this.currentContentPageNumber + 1;
        this.currentContentPageNumber += 1;
        break;
      case ProfileItemType.Liked:
        moreContentType = MORE_CONTENT_TYPE.PROFILE_LIKED;
        pageNumber = this.currentLikedPageNumber + 1;
        this.currentLikedPageNumber += 1;
        break;
      case ProfileItemType.Booked:
        moreContentType = MORE_CONTENT_TYPE.PROFILE_BOOKED;
        pageNumber = this.currentBookedPageNumber + 1;
        this.currentBookedPageNumber += 1;
        break;
    }

    this.contentService.getMoreContent(null, this.user.t_alias_generated, moreContentType, "created_date", "DESC", pageNumber, this.pageSize).subscribe(
      (response: any) => {
        if (profileItemType === ProfileItemType.Content) {
          if (response.content_list.length > 0)
            this.userInfo.contentList = [...this.userInfo.contentList, ...response.content_list];
        }
        if (profileItemType === ProfileItemType.Liked) {
          if (response.content_list.length > 0)
            this.userInfo.likedList = [...this.userInfo.likedList, ...response.content_list];
        }
        if (profileItemType === ProfileItemType.Booked) {
          if (response.content_list.length > 0)
            this.userInfo.bookedList = [...this.userInfo.bookedList, ...response.content_list];
        }
        this.isLoading = false;
      },
      error => {
      }
    );

    this.isLoading = false;

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

}
