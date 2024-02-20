import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_LIST } from '../../utility/global-constant';
import { Notification } from '../../models/notification';
import { NOTIFICATION_TYPE } from '../../utility/enum-constant';
import moment, { Moment } from 'moment';

@Component({
  selector: 'unievent-navbar-notification',
  templateUrl: './navbar-notification.component.html',
  styleUrls: ['./navbar-notification.component.scss']
})
export class NavbarNotificationComponent {
  NOTIFICATION_TYPE_CP = NOTIFICATION_TYPE;
  activeNotification = [true, false];
  showNotifications = false;
  showNotificationSetting = false;
  notificationCount: number = 999;
  notificationAllArray: Array<Notification> = [
    {
      notification_id: 1,
      user_id: 1,
      type: NOTIFICATION_TYPE.FRIEND_REQUEST,
      body: "Mario Baldi ti ha inviato una richiesta di amicizia",
      image: "https://staff.polito.it/mario.baldi/images/Mario%20202004.jpg",
      action_link: "/acceptRequest?user_id='3'",
      not_read:true,
      creationDateTime: moment().subtract(2, 'hours')
    },
    {
      notification_id: 2,
      user_id: 1,
      type: NOTIFICATION_TYPE.SUGGEST_TOPIC,
      body: "Hai un nuovo suggerimento di topic: Creazione di una Lega Fantacalcio: Consigli, Regole e Divertimento!",
      image: "https://cdn.skuola.net/w1200h687/news_foto/image-grabber/image-64621625e9ba2.jpg",
      action_link: "/topic/detail?topic_id=3'",
      not_read:false,
      creationDateTime: moment().subtract(12, 'hours')
    },
    {
      notification_id: 3,
      user_id: 1,
      type: NOTIFICATION_TYPE.SHARE_TOPIC,
      body: "Bocconcino ha condiviso un topic: La Nuova Stagione de I Simpson: Aspettative, Anticipazioni e Discussioni!",
      image: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/222551259_4642039215854129_7061172115070197192_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=KQJokzmG800AX8ANkGW&_nc_ht=scontent.fnap5-1.fna&oh=00_AfAd168K40ldAPEOajj_9tRMVqLghtyd7oMgv7ezwHkMQg&oe=65D89E50",
      action_link: "/topic/detail?topic_id=3'",
      not_read:false,
      creationDateTime: moment().subtract(14, 'hours')
    },
    {
      notification_id: 4,
      user_id: 1,
      type: NOTIFICATION_TYPE.SUGGEST_FRIEND,
      body: "Hai un nuovo suggerimento di amicizia: Puddi",
      image: "https://media.licdn.com/dms/image/C4D03AQGkLFUb5idDuQ/profile-displayphoto-shrink_200_200/0/1591343556730?e=2147483647&v=beta&t=SnstIQz9tYr3G6HIK7OcBRKKXtSn-0_J1bODPKlc5MM",
      action_link: "/user/detail?usernameHash=puddi.2'",
      not_read:false,
      creationDateTime: moment().subtract(16, 'hours')
    },
    {
      notification_id: 5,
      user_id: 1,
      type: NOTIFICATION_TYPE.SHARE_EVENT,
      body: "Maria Politano ha condiviso un evento: Discoteca tropicale",
      image: "https://cdn.21buttons.com/posts/640x799/a4f98433206c47f3ac3b47039996f26f_1080x1349.jpg",
      action_link: "/event/detail?event_id=3'",
      not_read:false,
      creationDateTime: moment().subtract(21, 'hours')
    },
    {
      notification_id: 6,
      user_id: 1,
      type: NOTIFICATION_TYPE.SUGGEST_EVENT,
      body: "Hai un nuovo suggerimento di evento: Discoteca tropicale",
      image: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
      action_link: "/event/detail?event_id=2'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 7,
      user_id: 1,
      type: NOTIFICATION_TYPE.UPDATE_TERMS,
      body: "Nuovo Aggiornamento: Termini & Condizioni",
      image: "/assets/img/systemnotificationLogo.svg",
      action_link: "/terms-of-use'",
      not_read:true,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 8,
      user_id: 1,
      type: NOTIFICATION_TYPE.PAYMENT_REFUSED,
      body: "Ordine #39438: Pagamento rifiutato",
      image: "/assets/img/systemnotificationLogo.svg",
      action_link: "/ticket/order/detail?payment_id=asdasj3sxgjhs'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 9,
      user_id: 1,
      type: NOTIFICATION_TYPE.TAG_COMMENT,
      body: "Sei stato citato in un commento: Cosa ne pensi?",
      image: "https://th.bing.com/th/id/OIP.qPT3hh7i4iLVn1jUIpdaYAHaEK?rs=1&pid=ImgDetMain",
      action_link: "/topic/detail?topic_id=3&comment_id=3'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 10,
      user_id: 1,
      type: NOTIFICATION_TYPE.TICKET_SYSTEM_REPLY,
      body: "Ticket #3938ab: C'è una nuova risposta",
      image: "/assets/img/systemnotificationLogo.svg",
      action_link: "/ticket_system/detail?ticket_id=3'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 11,
      user_id: 1,
      type: NOTIFICATION_TYPE.COMMENT_REPLY,
      body: "Hai una risposta al tuo commento: L'evento non è stato dei migliori",
      image: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
      action_link: "/event/detail?event_id=3&comment_id=22'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 12,
      user_id: 1,
      type: NOTIFICATION_TYPE.TICKET_SEAT_ASSIGNED,
      body: "Ti è stato assegnato un nuovo biglietto (Tavolo): Ladies Night Posto #300",
      image: "/assets/img/systemnotificationLogo.svg",
      action_link: "/ticket/detail?ticket_id=3'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 13,
      user_id: 1,
      type: NOTIFICATION_TYPE.COMMENT_LIKE,
      body: "Hai ricevuto un mi piace al tuo commento: L'evento non è stato dei migliori",
      image: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
      action_link: "/event/detail?event_id=3&comment_id=5'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 14,
      user_id: 1,
      type: NOTIFICATION_TYPE.COMMENT_NEW_EVENT,
      body: "Ci sono nuovi commmenti su un evento che segui",
      image: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
      action_link: "/event/detail?event_id=1'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 15,
      user_id: 1,
      type: NOTIFICATION_TYPE.COMMENT_NEW_TOPIC,
      body: "Ci sono nuovi commmenti su un topic che segui",
      image: "https://www.salernonews24.com/wp-content/uploads/2017/12/unisa2-1-1024x671.jpg",
      action_link: "/topic/detail?topic_id=1'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    },
    {
      notification_id: 16,
      user_id: 1,
      type: NOTIFICATION_TYPE.COMMENT_DISLIKE,
      body: "Hai ricevuto un non mi piace al tuo commento: L'evento non è stato dei migliori",
      image: "https://rivieraticket.it/wp-content/uploads/2023/08/Tropical-closing-party-Byblos-01-09-23.jpg",
      action_link: "/event/detail?event_id=1'",
      not_read:false,
      creationDateTime: moment().subtract(25, 'hours')
    }
  ];

  constructor(private elementRef: ElementRef, private router: Router) {
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target) && event.target.value === undefined) {
      this.closeNotifications();
    }
  }

  closeNotifications() {
    this.showNotifications = false;
  }

  openNotificationModal() {
    if(!window.location.href.includes("notification") || window.location.href.includes("setting")){
      this.showNotifications = !this.showNotifications;
    }
  }

  changeNotificationMode(index: number) {
    if (index == 1)
      this.activeNotification = [false, true];
    else
      this.activeNotification = [true, false];
  }

  goToAllNotification() {
    this.closeNotifications();
    this.router.navigate([ROUTE_LIST.notification.list]);
  }

  getHourStr(data: Moment) {
    if (data) {
      const differenzaInOre = moment().diff(data, 'hours');
      const differenzaInGiorni = moment().diff(data, 'days');

      if (differenzaInOre < 24) {
        if (differenzaInOre > 1)
          return `${differenzaInOre} ore fa`;
        return `${differenzaInOre} ora fa`;
      } else {
        if (differenzaInGiorni > 1)
          return `${differenzaInGiorni} giorni fa`;
        return `${differenzaInGiorni} giorno fa`;
      }
    }
    return "";
  }

  actionFriendRequest(state: boolean, notification_id: number) {
    let elFound = this.notificationAllArray.find(el => el.notification_id === notification_id);
    if (state && elFound) {
      elFound.creationDateTime = null;
      elFound.body = "Hai accettato la richiesta di amicizia";
      elFound.type = NOTIFICATION_TYPE.FRIEND_REQUEST_ACCEPTED;
    } else {
      elFound.creationDateTime = null;
      elFound.body = "Hai rifiutato la richiesta di amicizia";
      elFound.type = NOTIFICATION_TYPE.FRIEND_REQUEST_REFUSED;
    }
    let $this = this;
    setTimeout(() => {
      $this.notificationAllArray = $this.notificationAllArray.filter(el => el.notification_id != notification_id);
    }, 2000);
    //Manca la chiamata al back-end per confermare / rifiutare
  }

  openNotificationSettingModal(){
    this.showNotificationSetting = !this.showNotificationSetting;
  }

  closeNotificationSetting(){
    this.showNotificationSetting = false;
  }

  setAllNotificationRead(){
    let notReadArray = this.notificationAllArray.filter(el=>el.not_read);
    notReadArray.forEach(el=>el.not_read = false);
  }
}
