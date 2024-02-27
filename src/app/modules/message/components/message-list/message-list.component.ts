import { AfterViewChecked, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../models/message';
import { USER_TYPE } from 'src/app/core/utility/global-constant';
import moment, { Moment } from 'moment';
import { Chat } from '../../models/chat';
import { User } from 'src/app/core/models/user';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'unievent-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements AfterViewChecked {
  protected darkMode = false;
  protected messageValue: string = '';
  protected filteredListByActiveChat: Chat;
  protected currentUser = {
    t_username: null,
    t_password: null,
    t_name: "Antonio",
    t_surname: "Lodato",
    t_alias_generated: "lodo",
    t_profile_photo: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/336655652_1366549564142836_6189179333211279215_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MMspqbZpIoEAX8SJzKR&_nc_ht=scontent.fnap5-1.fna&oh=00_AfCxMQHUITv5n3ssutheEupX0QdJ4fcrGeR0ACM3DoT_9w&oe=65DB9102",
    t_type: USER_TYPE.CUSTOMER
  };
  protected activeChatUser: User = null;
  protected chatList: Array<Chat> = [
    {
      userChat: {
        t_username: null,
        t_password: null,
        t_name: "Antonio",
        t_surname: "Baldi",
        t_alias_generated: "baldilodo",
        t_profile_photo: "https://staff.polito.it/mario.baldi/images/Mario%20202004.jpg",
        t_type: USER_TYPE.CUSTOMER
      },
      messages: [
        {
          user_to: {
            t_username: null,
            t_password: null,
            t_name: "Antonio",
            t_surname: "Baldi",
            t_alias_generated: "baldilodo",
            t_profile_photo: "https://staff.polito.it/mario.baldi/images/Mario%20202004.jpg",
            t_type: USER_TYPE.CUSTOMER
          },
          user_at: {
            t_username: null,
            t_password: null,
            t_name: "Antonio",
            t_surname: "Lodato",
            t_alias_generated: "lodo",
            t_profile_photo: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/336655652_1366549564142836_6189179333211279215_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MMspqbZpIoEAX8SJzKR&_nc_ht=scontent.fnap5-1.fna&oh=00_AfCxMQHUITv5n3ssutheEupX0QdJ4fcrGeR0ACM3DoT_9w&oe=65DB9102",
            t_type: USER_TYPE.CUSTOMER
          },
          message: "Ciao, come stai?",
          dateTime: moment("15/02/2024 12:40PM", "D/M/YYYY HH:mm:ss")
        },
        {
          user_to: {
            t_username: null,
            t_password: null,
            t_name: "Antonio",
            t_surname: "Lodato",
            t_alias_generated: "lodo",
            t_profile_photo: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/336655652_1366549564142836_6189179333211279215_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MMspqbZpIoEAX8SJzKR&_nc_ht=scontent.fnap5-1.fna&oh=00_AfCxMQHUITv5n3ssutheEupX0QdJ4fcrGeR0ACM3DoT_9w&oe=65DB9102",
            t_type: USER_TYPE.CUSTOMER
          },
          user_at: {
            t_username: null,
            t_password: null,
            t_name: "Antonio",
            t_surname: "Baldi",
            t_alias_generated: "baldilodo",
            t_profile_photo: "https://staff.polito.it/mario.baldi/images/Mario%20202004.jpg",
            t_type: USER_TYPE.CUSTOMER
          },
          message: "Bene e tu?",
          dateTime: moment("15/02/2024 12:42PM", "D/M/YYYY HH:mm:ss")
        }
      ]
    },
    {
      userChat: {
        t_username: null,
        t_password: null,
        t_name: "Maria",
        t_surname: "Politano",
        t_alias_generated: "mariapolitano1",
        t_profile_photo: "https://cdn.21buttons.com/posts/640x799/a4f98433206c47f3ac3b47039996f26f_1080x1349.jpg",
        t_type: USER_TYPE.CUSTOMER
      },
      messages: [
        {
          user_to: {
            t_username: null,
            t_password: null,
            t_name: "Maria",
            t_surname: "Politano",
            t_alias_generated: "mariapolitano1",
            t_profile_photo: "https://cdn.21buttons.com/posts/640x799/a4f98433206c47f3ac3b47039996f26f_1080x1349.jpg",
            t_type: USER_TYPE.CUSTOMER
          },
          user_at: {
            t_username: null,
            t_password: null,
            t_name: "Antonio",
            t_surname: "Lodato",
            t_alias_generated: "lodo",
            t_profile_photo: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/336655652_1366549564142836_6189179333211279215_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MMspqbZpIoEAX8SJzKR&_nc_ht=scontent.fnap5-1.fna&oh=00_AfCxMQHUITv5n3ssutheEupX0QdJ4fcrGeR0ACM3DoT_9w&oe=65DB9102",
            t_type: USER_TYPE.CUSTOMER
          },
          message: "Sei un bel ragazzo, lo sai? Blbllb",
          dateTime: moment("26/02/2024 12:40PM", "D/M/YYYY HH:mm:ss")
        }
      ]
    }
  ];
  protected showEmoticonPanel = false;


  constructor(private router: Router) {
  }

  ngAfterViewChecked(): void {
    let darkModeChoice = localStorage.getItem("darkModeChoice");
    if (darkModeChoice === "0") {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
  }

  onInputChange(): void {
    console.log('Input changed:', this.messageValue);
  }

  getMessageStatus(date: moment.Moment): string {
    const now = moment(); // Data e ora correnti
    const diffInHours = now.diff(date, 'hours'); // Differenza in ore tra la data fornita e adesso

    if (diffInHours < 24) {
      return date.format("HH:mm");
    } else if (diffInHours < 48) {
      return this.translate("Yesterday");
    } else if (diffInHours <= 24 * 5) {
      return this.translate(date.fromNow());
    } else {
      return date.format("DD/MM/YYYY HH:MM");
    }
  }

  translate(str: string) {
    let tmpStr: string = str;
    if (str === "yesterday") {
      return "Ieri"
    } else {
      tmpStr = tmpStr.replace("days", "giorni").replace("ago", "fa");
    }
    return tmpStr;
  }

  setActiveUser(el: User) {
    this.activeChatUser = el;
    this.filteredListByActiveChat = this.chatList.filter(chatEl => chatEl.userChat.t_alias_generated === el.t_alias_generated)[0];
  }

  removeActiveUser() {
    this.activeChatUser = null;
  }

  openEmoticonPanel() {
    this.showEmoticonPanel = !this.showEmoticonPanel;
  }

  closeEmoticonPanel() {
    this.showEmoticonPanel = false;
  }

  addEmoticonToChat(emoji: string) {
    this.messageValue += emoji
  }

  sendMessage() {
    if (this.messageValue.length > 0) {
      let chat = this.chatList.filter(el => el.userChat.t_alias_generated === this.activeChatUser.t_alias_generated)[0];
      chat.messages.push({
        user_to: this.currentUser,
        user_at: this.activeChatUser,
        message: this.messageValue,
        dateTime: moment(moment(), "DD/MM/YYYY HH:MM:SS")
      });
      this.messageValue = '';
    }
  }
}
