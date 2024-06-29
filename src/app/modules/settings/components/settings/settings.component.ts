import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services';
import { ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  activeMenu: string = 'account';
  showDeleteAccountPanel: boolean = false;
  showDataDownloadPanel: boolean = false;
  showChangePasswordPanel: boolean = false;
  selectedOption: string = 'Request';
  marginTopOffset: number = 80;
  isRequested: boolean = false;
  isDataAvailable: boolean = false;
  optionValue: string = "all";
  formatValue: string = "JSON";
  interactionsChecked: boolean = false;
  favoritesChecked: boolean = false;
  contentChecked: boolean = false;
  chatChecked: boolean = false;
  dynamicClass = [];
  formChangePassword = new FormGroup({
    old_password: new FormControl(null),
    new_password: new FormControl(null),
  });
  formRequestData = new FormGroup({
    dataOption: new FormControl('all'),
    chatOption: new FormControl(null),
    contentOption: new FormControl(null),
    favoritesOption: new FormControl(null),
    interactionsOption: new FormControl(null),
    dataFormat: new FormControl('JSON')
  });

  //Current user settings (vanno prese dal back-end)
  settings = null;

  ngAfterViewInit() {
    this.activeMenu = window.location.href.split("#")[1] || 'account'; // Utilizzo '||' per impostare 'account' se il frammento è vuoto
    this.scrollTo(this.activeMenu);

  }

  scrollTo(section: string): void {
    this.activeMenu = section;
    const element = document.getElementById(section);
    if (element && this.scrollContainer.nativeElement) {
      const rect = element.getBoundingClientRect();
      const scrollTop = this.scrollContainer.nativeElement.scrollTop;
      const targetPosition = rect.top + (scrollTop - this.marginTopOffset - 40);
      this.scrollContainer.nativeElement.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService, private cookieService: CookieService) {
    userService.getUserSettings(null).subscribe(
      (response: any) => {
        this.settings = response;
      },
      error => {
        this.toastr.error('Errore nel recupero delle impostazioni');
      });
  }

  executeAction(action: string) {
    switch (action) {
      case "data":
        this.getRequestPersonalDataStatus();
        break;
      case "delete":
        this.showDeleteAccountPanel = true;
        break;
      case "changePassword":
        this.showChangePasswordPanel = true;
        break;
      case "artist":
        this.router.navigate([ROUTE_LIST.artist.verify]);
        break;
      case "help":
        const newTabUrl = this.router.createUrlTree([ROUTE_LIST.supports.basepath]);
        window.open(newTabUrl.toString(), '_blank');
        break;
    }
  }

  cancelDeleteAccount() {
    this.showDeleteAccountPanel = false;
  }

  deleteAccount() {
    this.userService.deleteAccount().subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.cookieService.delete('auth_token');
        this.cookieService.delete('current_user');
        this.router.navigate(["/login"])
      },
      error => {
        this.toastr.error('Errore nell\' eliminazione dell\' account');
      }
    );
    this.showDeleteAccountPanel = false;
  }

  cancelChangePassword() {
    this.showChangePasswordPanel = false;
    this.formChangePassword.reset();
  }

  changePassword(form: any) {
    this.userService.editUser(null, null, null, null, form.value.old_password, form.value.new_password).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
      },
      error => {
        this.toastr.error('Errore nella modifica delle credenziali, controllare e correggere i campi');
      }
    );
    this.showChangePasswordPanel = false;
    this.formChangePassword.reset();
  }

  closeDownloadPanel() {
    this.showDataDownloadPanel = false;
  }

  sendDataRequest(form: any) {
    this.userService.requestPersonalData(form.value.dataOption,
      form.value.chatOption,
      form.value.contentOption,
      form.value.favoritesOption,
      form.value.interactionsOption,
      form.value.dataFormat).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.isRequested = true;
          this.showDataDownloadPanel = false;
        },
        error => {
          this.toastr.error('Errore nella richiesta dei dati personali, riprova più tardi');
        });
  }

  getRequestPersonalDataStatus() {
    this.userService.getRequestPersonalDataStatus().subscribe(
      (response: any) => {
        if (response.status === "REQUESTED") {
          this.isRequested = true;
          this.isDataAvailable = false;
        } else {
          this.isRequested = false;
          this.isDataAvailable = true;
        }
      },
      error => {
        this.isRequested = false;
        this.isDataAvailable = false;
      });
    this.showDataDownloadPanel = true;
  }

  sendDownloadData() {
    this.userService.downloadPersonalData().subscribe(
      (response: any) => {
        const type = response.type_data_download;
        const data = response.download_file;
        let fileContent: string;

        if (type === 'JSON') {
          fileContent = JSON.stringify(data, null, 2);
        } else {
          fileContent = this.convertToText(data);
        }

        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `personal_data.${type.toLowerCase()}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      error => {
        this.isRequested = false;
        this.isDataAvailable = false;
      });

    this.showDataDownloadPanel = false;
  }

  private convertToText(data: any): string {
    let textContent = '';

    if (data.chat_data) {
      textContent += 'Chat Data:\n';
      data.chat_data.conversations.forEach((conversation: any) => {
        textContent += `With: ${conversation.with}\n`;
        conversation.messages.forEach((message: any) => {
          textContent += `  [${message.timestamp}] ${message.message}\n`;
        });
      });
      textContent += '\n';
    }

    if (data.content_data) {
      textContent += 'Content Data:\n';
      data.content_data.posts.forEach((post: any) => {
        textContent += `Post ID: ${post.post_id}\n  Content: ${post.content}\n  Timestamp: ${post.timestamp}\n`;
      });
      textContent += '\n';
      data.content_data.likes.forEach((like: any) => {
        textContent += `Liked Post ID: ${like.post_id}\n  Timestamp: ${like.timestamp}\n`;
      });
      textContent += '\n';
    }

    if (data.booked_data) {
      textContent += 'Booked Data:\n';
      data.booked_data.events.forEach((event: any) => {
        textContent += `Event ID: ${event.event_id}\n  Name: ${event.name}\n  Date: ${event.date}\n`;
      });
      textContent += '\n';
    }

    if (data.interaction_data) {
      textContent += 'Interaction Data:\n';
      data.interaction_data.followers.forEach((follower: any) => {
        textContent += `Follower: ${follower.username}\n  Followed On: ${follower.followed_on}\n`;
      });
      textContent += '\n';
      data.interaction_data.following.forEach((following: any) => {
        textContent += `Following: ${following.username}\n  Followed On: ${following.followed_on}\n`;
      });
      textContent += '\n';
    }

    return textContent;
  }

  changeOption(option: string) {
    this.selectedOption = option;
  }

  addFocusClass(field: string) {
    this.dynamicClass[field] = "explode-span";
  }

  removeFocusClass(field: string) {
    this.dynamicClass[field] = "";
  }

  editSettings(type: string) {
    let value = null;
    switch (type) {
      case "PRIVATE_ACCOUNT_TOGGLE":
        value = !this.settings.privacy.visibility.show_booked;
        break;
      case "SHOW_BOOKED_TOGGLE":
        value = !this.settings.privacy.visibility.show_booked;
        break;
      case "MESSAGE_TOGGLE":
        value = !this.settings.privacy.messages.all_user_send_message;
        break;
      case "DESKTOP_NOTIFICATION_TOGGLE":
        value = !this.settings.notification.desktop.browser_consent;
        break;
      case "INTERACTION_LIKE_TOGGLE":
        value = !this.settings.notification.interaction.like;
        break;
      case "INTERACTION_DISCUSSION_TOGGLE":
        value = !this.settings.notification.interaction.comments;
        break;
      case "INTERACTION_TAG_TOGGLE":
        value = !this.settings.notification.interaction.tag;
        break;
      case "INTERACTION_NEW_FOLLOWER_TOGGLE":
        value = !this.settings.notification.interaction.new_follower_request;
        break;
      case "INTERACTION_SUGGEST_FOLLOWER_TOGGLE":
        value = !this.settings.notification.interaction.follower_suggest;
        break;
      case "INTERACTION_TERMS_AND_CONDITION_TOGGLE":
        value = !this.settings.notification.interaction.terms_and_condition;
        break;
      case "INTERACTION_PAYMENTS_TOGGLE":
        value = !this.settings.notification.interaction.payments;
        break;
      case "INTERACTION_TICKETS_TOGGLE":
        value = !this.settings.notification.interaction.tickets;
        break;
    }
    this.userService.saveUserSettings(type, value).subscribe(
      (response: any) => {
        switch (type) {
          case "PRIVATE_ACCOUNT_TOGGLE":
            this.settings.privacy.visibility.private_account = !this.settings.privacy.visibility.private_account;
            break;
          case "SHOW_BOOKED_TOGGLE":
            this.settings.privacy.visibility.show_booked = !this.settings.privacy.visibility.show_booked;
            break;
          case "MESSAGE_TOGGLE":
            this.settings.privacy.messages.all_user_send_message = !this.settings.privacy.messages.all_user_send_message;
            break;
          case "DESKTOP_NOTIFICATION_TOGGLE":
            this.settings.notification.desktop.browser_consent = !this.settings.notification.desktop.browser_consent;
            break;
          case "INTERACTION_LIKE_TOGGLE":
            this.settings.notification.interaction.like = !this.settings.notification.interaction.like;
            break;
          case "INTERACTION_DISCUSSION_TOGGLE":
            this.settings.notification.interaction.comments = !this.settings.notification.interaction.comments;
            break;
          case "INTERACTION_TAG_TOGGLE":
            this.settings.notification.interaction.tag = !this.settings.notification.interaction.tag;
            break;
          case "INTERACTION_NEW_FOLLOWER_TOGGLE":
            this.settings.notification.interaction.new_follower_request = !this.settings.notification.interaction.new_follower_request;
            break;
          case "INTERACTION_SUGGEST_FOLLOWER_TOGGLE":
            this.settings.notification.interaction.follower_suggest = !this.settings.notification.interaction.follower_suggest;
            break;
          case "INTERACTION_TERMS_AND_CONDITION_TOGGLE":
            this.settings.notification.interaction.terms_and_condition = !this.settings.notification.interaction.terms_and_condition;
            break;
          case "INTERACTION_PAYMENTS_TOGGLE":
            this.settings.notification.interaction.payments = !this.settings.notification.interaction.payments;
            break;
          case "INTERACTION_TICKETS_TOGGLE":
            this.settings.notification.interaction.tickets = !this.settings.notification.interaction.tickets
            break;
        }
      },
      error => {
        this.toastr.error('Errore nell\' aggiornamento dell\' impostazione');
      }
    );
  }

}
