import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { pluck } from 'rxjs';
import { GlobalService } from 'src/app/core/services';
import { ItemType } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements AfterViewInit {
  protected item: any = null;
  bgLeftPanel: string = null;
  ItemType: any = ItemType;

  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.cdr.detectChanges();
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        this.item = decode.item;
        this.initialize();
      }
      );
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

  navigateToBack(){
    window.history.back();
  }

  navigateToUserProfile(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated;
    this.router.navigate([link]);
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

  navigateToBuyTicket() {
    alert("xd")
  }

  addLike(item: any) {
    alert("LIKE")
  }

  book(item: any) {
    alert("SHARE")
  }

  addComment() {
    /*if (this.messageValue.length === 0) {
      return;
    }

    const activeChatAlias = this.activeChatUser.t_alias_generated;
    const chat = this.chatList.find(el => el.userChat.t_alias_generated === activeChatAlias);

    if (chat) {
      const newMessage = {
        user_to: this.currentUser,
        user_at: this.activeChatUser,
        message: this.messageValue,
        dateTime: moment(moment(), "DD/MM/YYYY HH:MM:SS")
      };

      chat.messages.push(newMessage);
      this.groupMessagesByDate();
      this.groupMessagesByActiveChatUserByDate();
      this.messageValue = '';
      setTimeout(()=>{
        this.scrollChatToBottom();
      },1)
    }*/
  }
}
