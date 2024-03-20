import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { pluck } from 'rxjs';
import { GlobalService } from 'src/app/core/services';
import { ItemType, USER_TYPE } from 'src/app/core/utility/global-constant';
import { Comment } from '../../models/comment';
import { randomIntFromInterval } from 'src/app/core/utility/functions-constants';

@Component({
  selector: 'unievent-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('messageInput') messageInput: ElementRef;
  protected item: any = null;
  bgLeftPanel: string = null;
  ItemType: any = ItemType;
  commentValue: string = '';
  showEmoticonPanel = false;
  darkMode = false;
  currentLink: String = window.location.href;
  comments: Comment[] = [
    {
      discussion_id: 1,
      body: "Primo commento",
      like_count: 10,
      t_user: this.generateRandomAccount(0),
      created_date: this.generateRandomDate(),
      children: [
        {
          discussion_id: 2,
          body: "Commento figlio del primo commento",
          like_count: 5,
          t_user: this.generateRandomAccount(1),
          created_date: this.generateRandomDate(),
        },
        {
          discussion_id: 3,
          body: "Altro commento figlio del primo commento",
          like_count: 2,
          t_user: this.generateRandomAccount(2),
          created_date: this.generateRandomDate()
        }
      ]
    },
    {
      discussion_id: 4,
      body: "Secondo commento",
      like_count: 8,
      t_user: this.generateRandomAccount(3),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 5,
      body: "Terzo commento",
      like_count: 3,
      t_user: this.generateRandomAccount(4),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 6,
      body: "Quarto commento",
      like_count: 12,
      t_user: this.generateRandomAccount(5),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 7,
      body: "Quinto commento",
      like_count: 6,
      t_user: this.generateRandomAccount(6),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 8,
      body: "Sesto commento",
      like_count: 4,
      t_user: this.generateRandomAccount(7),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 9,
      body: "Settimo commento",
      like_count: 7,
      t_user: this.generateRandomAccount(8),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 10,
      body: "Ottavo commento",
      like_count: 11,
      t_user: this.generateRandomAccount(9),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 11,
      body: "Nono commento",
      like_count: 9,
      t_user: this.generateRandomAccount(10),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 12,
      body: "Decimo commento",
      like_count: 14,
      t_user: this.generateRandomAccount(11),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 13,
      body: "Undicesimo commento",
      like_count: 5,
      t_user: this.generateRandomAccount(12),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 14,
      body: "Dodicesimo commento",
      like_count: 8,
      t_user: this.generateRandomAccount(13),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 15,
      body: "Tredicesimo commento",
      like_count: 3,
      t_user: this.generateRandomAccount(14),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 16,
      body: "Quattordicesimo commento",
      like_count: 10,
      t_user: this.generateRandomAccount(15),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 17,
      body: "Quindicesimo commento",
      like_count: 6,
      t_user: this.generateRandomAccount(16),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 18,
      body: "Sedicesimo commento",
      like_count: 9,
      t_user: this.generateRandomAccount(17),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 19,
      body: "Diciassettesimo commento",
      like_count: 7,
      t_user: this.generateRandomAccount(18),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 20,
      body: "Diciottesimo commento",
      like_count: 15,
      t_user: this.generateRandomAccount(19),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 21,
      body: "Diciannovesimo commento",
      like_count: 8,
      t_user: this.generateRandomAccount(20),
      created_date: this.generateRandomDate()
    },
    {
      discussion_id: 22,
      body: "Ventesimo commento",
      like_count: 13,
      t_user: this.generateRandomAccount(21),
      created_date: this.generateRandomDate()
    }
  ];


  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngAfterViewChecked(): void {
    this.darkMode = localStorage.getItem("darkModeChoice") === "1";
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

  getOtherActionLabel(discussion_lenght: number) {
    return 'Visualizza ' + (discussion_lenght > 1 ? `${discussion_lenght} risposte` : '1 risposta');
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

  openEmoticonPanel() {
    this.showEmoticonPanel = !this.showEmoticonPanel;
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

  focusComment() {

  }

  private generateRandomAccount(index: number): any { //Account
    const randomAccountType = randomIntFromInterval(1, 3) === 1 ? USER_TYPE.ARTIST : randomIntFromInterval(1, 3) === 2 ? USER_TYPE.COMPANY : USER_TYPE.CREATOR;
    return {
      id: index,
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
}
