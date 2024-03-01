import { AfterViewChecked, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../models/message';
import { USER_TYPE } from 'src/app/core/utility/global-constant';
import moment from 'moment';
import { Chat } from '../../models/chat';
import { User } from 'src/app/core/models/user';
import { ChatDate } from '../../models/chat-date';

@Component({
  selector: 'unievent-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements AfterViewChecked {
  @ViewChild('messageInput') messageInput: ElementRef;
  @ViewChild('chatContainer') chatContainer: ElementRef;
  darkMode = false;
  messageValue = '';
  activeChatUser: User = null;
  currentUser: User = {
    t_username: null,
    t_password: null,
    t_name: "Antonio",
    t_surname: "Lodato",
    t_alias_generated: "lodo",
    t_profile_photo: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/336655652_1366549564142836_6189179333211279215_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MMspqbZpIoEAX8SJzKR&_nc_ht=scontent.fnap5-1.fna&oh=00_AfCxMQHUITv5n3ssutheEupX0QdJ4fcrGeR0ACM3DoT_9w&oe=65DB9102",
    t_type: USER_TYPE.CUSTOMER
  };
  chatList: Chat[] = [
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
          user_to: { t_username: null, t_password: null, t_name: "Antonio", t_surname: "Baldi", t_alias_generated: "baldilodo", t_profile_photo: "https://staff.polito.it/mario.baldi/images/Mario%20202004.jpg", t_type: USER_TYPE.CUSTOMER },
          user_at: { t_username: null, t_password: null, t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "lodo", t_profile_photo: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/336655652_1366549564142836_6189179333211279215_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MMspqbZpIoEAX8SJzKR&_nc_ht=scontent.fnap5-1.fna&oh=00_AfCxMQHUITv5n3ssutheEupX0QdJ4fcrGeR0ACM3DoT_9w&oe=65DB9102", t_type: USER_TYPE.CUSTOMER },
          message: "Ciao, come stai?",
          dateTime: moment("15/02/2024 12:40PM", "D/M/YYYY HH:mm:ss")
        },
        {
          user_to: { t_username: null, t_password: null, t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "lodo", t_profile_photo: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/336655652_1366549564142836_6189179333211279215_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MMspqbZpIoEAX8SJzKR&_nc_ht=scontent.fnap5-1.fna&oh=00_AfCxMQHUITv5n3ssutheEupX0QdJ4fcrGeR0ACM3DoT_9w&oe=65DB9102", t_type: USER_TYPE.CUSTOMER },
          user_at: { t_username: null, t_password: null, t_name: "Antonio", t_surname: "Baldi", t_alias_generated: "baldilodo", t_profile_photo: "https://staff.polito.it/mario.baldi/images/Mario%20202004.jpg", t_type: USER_TYPE.CUSTOMER },
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
          user_to: { t_username: null, t_password: null, t_name: "Maria", t_surname: "Politano", t_alias_generated: "mariapolitano1", t_profile_photo: "https://cdn.21buttons.com/posts/640x799/a4f98433206c47f3ac3b47039996f26f_1080x1349.jpg", t_type: USER_TYPE.CUSTOMER },
          user_at: { t_username: null, t_password: null, t_name: "Antonio", t_surname: "Lodato", t_alias_generated: "lodo", t_profile_photo: "https://scontent.fnap5-1.fna.fbcdn.net/v/t39.30808-6/336655652_1366549564142836_6189179333211279215_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MMspqbZpIoEAX8SJzKR&_nc_ht=scontent.fnap5-1.fna&oh=00_AfCxMQHUITv5n3ssutheEupX0QdJ4fcrGeR0ACM3DoT_9w&oe=65DB9102", t_type: USER_TYPE.CUSTOMER },
          message: "Sei un bel ragazzo, lo sai? Blbllb",
          dateTime: moment("26/02/2024 12:40PM", "D/M/YYYY HH:mm:ss")
        }
      ]
    }
  ];
  filteredListByActiveChat: Chat;
  chatListGroupedByDate: ChatDate[] = [];
  groupedByDateActiveChatUser: ChatDate = null;
  showEmoticonPanel = false;

  constructor(private router: Router) {
    this.groupMessagesByDate();
  }

  ngAfterViewChecked(): void {
    this.darkMode = localStorage.getItem("darkModeChoice") === "1";
  }

  scrollChatToBottom() {
    if (this.chatContainer.nativeElement) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  onInputChange(): void {
  }

  getLatestMessageElement(chat: ChatDate): Message | null {
    const lastKey = Object.keys(chat.messages).pop();
    const messages = lastKey ? chat.messages[lastKey] : [];
    return messages.length > 0 ? messages[messages.length - 1] : null;
  }

  groupMessagesByDate() {
    this.chatListGroupedByDate = this.chatList.map(chat => {
      const groupedMessages: { [date: string]: Message[] } = {};

      chat.messages.forEach(message => {
        const dateKey = message.dateTime.format("D/M/YYYY HH:mm");

        groupedMessages[dateKey] = groupedMessages[dateKey] || [];
        groupedMessages[dateKey].push(message);
      });

      return {
        userChat: chat.userChat,
        messages: groupedMessages
      };
    });
  }

  groupMessagesByActiveChatUserByDate() {
    const groupedMessagesByActiveUser: { [date: string]: Message[] } = {};
    for (const message of this.filteredListByActiveChat.messages) {
      const dateKey = message.dateTime.format("D/M/YYYY HH:mm");
      groupedMessagesByActiveUser[dateKey] = groupedMessagesByActiveUser[dateKey] || [];
      groupedMessagesByActiveUser[dateKey].push(message);
    }
    this.groupedByDateActiveChatUser = {
      userChat: this.filteredListByActiveChat.userChat,
      messages: groupedMessagesByActiveUser
    };
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getMessageStatus(date: moment.Moment): string {
    const now = moment();
    const diffInHours = now.diff(date, 'hours');

    if (diffInHours < 24) {
      return date.format("HH:mm");
    }

    if (diffInHours < 48) {
      return this.translate("Yesterday");
    }

    if (diffInHours <= 24 * 5) {
      return this.translate(date.fromNow());
    }

    return date.format("DD/MM/YYYY HH:mm");
  }

  translate(str: string): string {
    if (str === "Yesterday") {
      return "Ieri";
    }

    return str.replace("days", "giorni").replace("ago", "fa");
  }

  setActiveUser(user: User) {
    this.activeChatUser = user;
    this.filteredListByActiveChat = this.chatList.find(chat => chat.userChat.t_alias_generated === user.t_alias_generated);
    this.groupMessagesByActiveChatUserByDate();
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
    const inputElement = this.messageInput.nativeElement;
    const currentCursorPosition = inputElement.selectionStart;
    this.messageValue = `${this.messageValue.slice(0, currentCursorPosition)}${emoji}${this.messageValue.slice(currentCursorPosition)}`;
    inputElement.setSelectionRange(this.messageValue.length, this.messageValue.length);
    inputElement.focus();
  }

  sendMessage() {
    if (this.messageValue.length === 0) {
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
    }
  }
}
