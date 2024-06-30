import { AfterViewChecked, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../models/message';
import moment from 'moment';
import { Chat } from '../../models/chat';
import { User } from 'src/app/core/models/user';
import { ChatDate } from '../../models/chat-date';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';

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
  currentUser: User;
  chatList: Chat[];
  filteredListByActiveChat: Chat;
  chatListGroupedByDate: ChatDate[] = [];
  groupedByDateActiveChatUser: ChatDate = null;
  showEmoticonPanel = false;

  constructor(private router: Router, private cookieService: CookieService, private userService: UserService, private toastr: ToastrService) {
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.currentUser = JSON.parse(cookieCurrentUser);
    }

    this.userService.getChatList().subscribe(
      (response: any) => {
        console.log(response)
        this.chatList = response;
        this.groupMessagesByDate();
      },
      error => {
        this.toastr.error('Errore non è stato possibile recuperare le chat' );
      }
    );
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
        const dateKey = moment(message.dateTime).format("D/M/YYYY HH:mm");

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
      const dateKey = moment(message.dateTime).format("D/M/YYYY HH:mm");
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

    return moment(date).format("DD/MM/YYYY HH:mm");
  }

  translate(str: string): string {
    if (str === "Yesterday") {
      return "Ieri";
    }

    return str.replace("days", "giorni").replace("ago", "fa");
  }

  setActiveUser(user: User) {
    this.userService.getChatMessageList(user.t_alias_generated).subscribe(
      (response: any) => {
        this.filteredListByActiveChat = this.chatList.find(chat => chat.userChat.t_alias_generated === user.t_alias_generated);
        this.activeChatUser = user;
        this.filteredListByActiveChat.messages = response;
        this.groupMessagesByActiveChatUserByDate();
      },
      error => {
        this.toastr.error('Errore non è stato possibile recuperare la chat' );
      }
    );
    
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
        user_from: this.currentUser,
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
