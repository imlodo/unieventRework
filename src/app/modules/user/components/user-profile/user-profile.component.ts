import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { User } from 'src/app/core/models/user';
import { GlobalService } from 'src/app/core/services';
import { randomIntFromInterval } from 'src/app/core/utility/functions-constants';
import { ItemType, ProfileItemType, USER_TYPE } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements AfterViewInit {
  ProfileItemType: any = ProfileItemType;
  @ViewChild('scrollableContent') scrollableContent: ElementRef;
  bodyElement: ElementRef;
  showEditPanel: boolean = false;
  username: string = ""; // assuming this is fetched from somewhere
  firstName: string = ""; // initial values for editing
  lastName: string = ""; // initial values for editing
  biography: string = ""; // initial values for editing
  profile_photo: string = "";
  user: User = {
    t_name: "Mario",
    t_surname: "Baldi",
    t_alias_generated: "mariobaldi1",
    t_description: "Sono un bel ragazzo",
    t_profile_photo: "/assets/img/userExampleImg.jpeg",
    is_verified: true,
    t_type: USER_TYPE.CREATOR
  }
  isLoading: boolean = false;
  scrollDistance = 1;
  scrollUpDistance = 1;
  ItemType: any = ItemType;
  currentGifLoading = 'assets/img/loader_white.gif';
  items: any[] = [];
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
  userInfo: any;
  selectedType: ProfileItemType = ProfileItemType.Content;
  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private renderer: Renderer2, private globalService: GlobalService, private router: Router) {
    this.userInfo = this.getUserInfoById();
    this.bodyElement = this.elementRef.nativeElement.ownerDocument.body;
    this.loadMoreItems(ProfileItemType.Content);
    this.isLoading = false;
    this.loadMoreItems(ProfileItemType.Liked);
    this.isLoading = false;
    this.loadMoreItems(ProfileItemType.Booked);
    this.username = this.user.t_alias_generated;
    this.firstName = this.user.t_name;
    this.lastName = this.user.t_surname;
    this.biography = this.user.t_description;
    this.profile_photo = this.user.t_profile_photo;
  }

  ngAfterViewInit(): void {
    //this.loadMoreItems();
    this.cdr.detectChanges();
  }

  navigateToBuyTicket() {
    alert("xd")
  }

  getUserInfoById() {
    return {
      contentList: [],
      countFollowed: 5312,
      countFollower: 3452,
      countLike: 13891,
      bookedList: [],
      likedList: [],
      isPublic: true
    }
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

  private generateRandomEvent(index: number): any { //Event
    const randomIntValue = randomIntFromInterval(0, 1);
    return {
      id: this.items.length + index,
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
      id: this.items.length + index,
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

  private loadMoreItems(profileItemType: ProfileItemType) {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, index) => {
        const type = this.getRandomType();
        switch (type) {
          case ItemType.Eventi:
            return this.generateRandomEvent(index);
          default:
            return this.generateRandomTopics(index);
        }
      });
      if (profileItemType === ProfileItemType.Content) {
        this.userInfo.contentList = [...this.userInfo.contentList, ...newItems];
      }
      if (profileItemType === ProfileItemType.Liked) {
        this.userInfo.likedList = [...this.userInfo.likedList, ...newItems];
      }
      if (profileItemType === ProfileItemType.Booked) {
        this.userInfo.bookedList = [...this.userInfo.bookedList, ...newItems];
      }
      this.isLoading = false;
    }, 1);
  }

  navigateToUserProfile(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated;
    this.router.navigate([link]);
  }

  followThisUserByCurrentUser() {

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
    this.resetFormFields();
  }

  resetFormFields(): void {
    this.username = this.user.t_alias_generated;
    this.firstName = this.user.t_name;
    this.lastName = this.user.t_surname;
    this.biography = this.user.t_description;
    this.profile_photo = this.user.t_profile_photo;
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.profile_photo = base64Image;
      };
      reader.readAsDataURL(selectedFile);
    }
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

  navigateToContent(item: any) {
    const link = "/@/" + item.t_user.t_alias_generated + "/content";
    const params = this.globalService.encodeParams({
      item: item
    });
    this.router.navigate([link, params]);
  }

  onScroll(profileItemType: ProfileItemType) {
    this.loadMoreItems(profileItemType);
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
