import { Component, AfterViewChecked, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../models/message';
import { User } from 'src/app/core/models/user';
import { ChatDate } from '../../models/chat-date';
import { CookieService } from 'ngx-cookie-service';
import { UserService, WebSocketService } from 'src/app/core/services';
import { ToastrService } from 'ngx-toastr';
import { Chat } from '../../models/chat';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'unievent-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements AfterViewChecked, AfterViewInit {
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
  showNewChatPanel = false;
  users: any[] = [];
  selectedUser: any;
  messageText: string = '';
  currentTerm: string = '';

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private toastr: ToastrService,
    private websocketService: WebSocketService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient) {

    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.currentUser = JSON.parse(cookieCurrentUser);
    }

    this.userService.getChatList().subscribe(
      (response: any) => {
        this.chatList = response;
        this.groupMessagesByDate();
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore non è stato possibile recuperare le chat');
      }
    );

    this.negotiateWebSocket();
  }

  searchUserService(term: string, items: User[]) {

    this.currentTerm = term;

    setTimeout(() => {
      if (this.currentTerm === term) {
        this.userService.searchUser(term).subscribe(
          (response) => {
            this.users = response.users;
            items = response.users;
          },
          error => console.error(error),
          () => {
            this.currentTerm = "";
          }
        );
      }
    }, 700)
  }

  sendNewChatMessage() {
    if (this.selectedUser && this.messageText.trim()) {
      const activeChatAlias = this.selectedUser.t_alias_generated;
      let chat = this.chatList.find(el => el.userChat.t_alias_generated === activeChatAlias);

      if (!chat) {
        //crea una nuova chat
        chat = {
          userChat: this.selectedUser,
          messages: [
            {
              user_from: this.currentUser,
              user_at: this.selectedUser,
              message: this.messageText,
              dateTime: moment(moment(), "DD/MM/YYYY HH:MM:SS")
            }
          ]
        }
        this.chatList.push(chat);
      }

      if (chat) {
        const newMessage = {
          user_from: this.currentUser,
          user_at: this.selectedUser,
          message: this.messageText,
          dateTime: moment(moment(), "DD/MM/YYYY HH:MM:SS")
        };

        this.messageValue = '';

        // Invia il messaggio tramite WebSocket
        const messageObject = {
          token: this.cookieService.get("auth_token"),
          t_alias_generated: this.selectedUser.t_alias_generated,
          content: newMessage.message
        };

        this.userService.addChatReply(this.selectedUser.t_alias_generated, newMessage.message).subscribe(
          (response: any) => {
            //Inserito con successo
          },
          error => {
            this.toastr.clear();
            this.toastr.error("Errore nell'invio del messaggio")
          }
        );

        this.websocketService.send(JSON.stringify(messageObject));
        this.setActiveUser(this.selectedUser);
        this.resetModalFieldsAndClose();
        this.sortChatsByLatestMessage();
        this.groupMessagesByDate();
        setTimeout(()=>{
          this.scrollChatToBottom();
        },200)
      }
    }
  }

  resetModalFieldsAndClose() {
    this.closeNewChatModal();
    this.users = [];
    this.selectedUser = null;
    this.messageText = "";
    this.currentTerm = "";
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    this.darkMode = localStorage.getItem("darkModeChoice") === "1";
  }

  scrollChatToBottom() {
    if (this.chatContainer.nativeElement) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  onInputChange(): void { }

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
      return moment(date).format("HH:mm");
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
        this.toastr.clear();
        this.toastr.error('Errore non è stato possibile recuperare la chat');
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

      this.messageValue = '';

      // Invia il messaggio tramite WebSocket
      const messageObject = {
        token: this.cookieService.get("auth_token"),
        t_alias_generated: activeChatAlias,
        content: newMessage.message
      };

      this.userService.addChatReply(activeChatAlias, newMessage.message).subscribe(
        (response: any) => {
          //Inserito con successo
        },
        error => {
          this.toastr.clear();
          this.toastr.error("Errore nell'invio del messaggio")
        }
      );

      this.websocketService.send(JSON.stringify(messageObject));
      setTimeout(() => {
        this.scrollChatToBottom();
      }, 1);
    }
  }

  private negotiateWebSocket() {
    this.websocketService.negotiateSocketUrl("your-username-here").subscribe(
      (response: any) => {
        const wsUrl = response.url;
        this.websocketService.connect(wsUrl).subscribe(
          (message: string) => {
            const messageData = JSON.parse(message);
            this.handleNewMessage(messageData);
          },
          error => console.error(error),
          () => console.warn('WebSocket connection completed!')
        );
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore connessione assente (NEGOTIATE ERROR)');
      }
    );
  }

  private sortChatsByLatestMessage() {
    this.chatList = [...this.chatList.sort((a, b) => {
      const aLatestMessage = this.getLatestMessage(a);
      const bLatestMessage = this.getLatestMessage(b);

      if (!aLatestMessage && !bLatestMessage) {
        return 0;
      } else if (!aLatestMessage) {
        return 1;
      } else if (!bLatestMessage) {
        return -1;
      } else {
        return moment(bLatestMessage.dateTime).diff(moment(aLatestMessage.dateTime));
      }
    })]
  }

  private getLatestMessage(chat: Chat): Message | null {
    return chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
  }

  private handleNewMessage(newMessage: Message) {
    var chat = null;
    //Sta ricevendo un messaggio da qualcuno
    if (this.currentUser.t_alias_generated === newMessage.user_at.t_alias_generated) {
      chat = this.chatList.find(el => el.userChat.t_alias_generated === newMessage.user_from.t_alias_generated);
    } else if (this.currentUser.t_alias_generated === newMessage.user_from.t_alias_generated) {
      //Ha ricevuto la conferma dell'invio del messaggio
      chat = this.chatList.find(el => el.userChat.t_alias_generated === newMessage.user_at.t_alias_generated);
    }

    if (chat) {
      chat.messages.push(newMessage);
      this.sortChatsByLatestMessage();
      this.groupMessagesByDate();
      this.groupMessagesByActiveChatUserByDate();
      setTimeout(() => {
        this.scrollChatToBottom();
      }, 1);
    }
  }

  openNewChatModal() {
    this.showNewChatPanel = true;
  }

  closeNewChatModal() {
    this.showNewChatPanel = false;
  }

}
