import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'unievent-frequently-answers',
  templateUrl: './frequently-answers.component.html',
  styleUrls: ['./frequently-answers.component.scss']
})
export class FrequentlyAnswersComponent {
  constructor(private sanitizer: DomSanitizer) {
  }

  siderbarList = [
    {
      id: 1,
      captionTitle: "Come registro il mio account?",
      contentItem: {
        title: "Registrazione account",
        bodyHtml: this.sanitizer.bypassSecurityTrustHtml('<div class="d-flex flex-column px-4 pb-4"><span class="my-3">Dalla schermata principale fare click sul pulsante "Registrati"</span><img class="rounded" width="500" src="/assets/img/reg1.jpg"><span class="my-3">Nella schermata successiva compilare tutti i campi obbligatori(1) e successivamente fare click sul pulsante "Crea Account"</span><img class="rounded" width="500" src="/assets/img/reg2.jpg"></div>')
      }
    },
    {
      id: 2,
      captionTitle: "Come effettuo l'accesso?",
      contentItem: {
        title: "Accesso al tuo account"
      }
    },
    {
      id: 3,
      captionTitle: "Come cambio la mia password?",
      contentItem: {
        title: "Cambio della password"
      }
    },
    {
      id: 4,
      captionTitle: "Come creo un Account Artista?",
      contentItem: {
        title: "Verificare il proprio account come Artista"
      }
    },
    {
      id: 5,
      captionTitle: "Notifiche e Messaggi",
      contentItem: {
        title: "Problemi comuni con notifiche e messaggi"
      }
    },
  ];
  selectedCaptionID: number = 1;

  changeSidebarElement(id: number) {
    this.selectedCaptionID = id;
  }
}
