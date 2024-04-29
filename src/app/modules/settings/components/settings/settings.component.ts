import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  //Current user settings (vanno prese dal back-end)
  settings = {
    privacy: {
      visibility: {
        private_account: false,
        show_booked: false
      },
      messages: {
        all_user_send_message: false
      }
    },
    notification:
    {
      desktop: {
        browser_consent: false,
      },
      interaction: {
        like: false,
        comments: false,
        tag: false,
        new_follower_request: false,
        follower_suggest: false,
        terms_and_condition: false,
        payments: false,
        tickets: false
      }
    }
  }

  constructor(private router: Router) { }

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

  executeAction(action: string) {
    switch (action) {
      case "data":
        this.showDataDownloadPanel = true;
        break;
      case "delete":
        this.showDeleteAccountPanel = true;
        break;
      case "artist":
        this.router.navigate([ROUTE_LIST.artist.verify]);
        break;
      case "help":
        const newTabUrl = this.router.createUrlTree([ROUTE_LIST.supports]);
        window.open(newTabUrl.toString(), '_blank');
        break;
    }
  }

  cancelDeleteAccount() {
    this.showDeleteAccountPanel = false;
  }

  deleteAccount() {
    this.showDeleteAccountPanel = false;
    //Logica per cancellare l'account, dopo effettuare il logout dell'utente
  }

  closeDownloadPanel() {
    this.showDataDownloadPanel = false;
  }

  sendDownloadDataRequest() {
    this.isRequested = true;
    //Qui va aggiunto toast per confermare che la richiesta è presa in carico
    this.showDataDownloadPanel = false;
  }

  sendDownloadData() {

  }

  changeOption(option: string) {
    this.selectedOption = option;
  }

}
