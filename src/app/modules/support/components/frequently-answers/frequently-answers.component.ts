import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'unievent-frequently-answers',
  templateUrl: './frequently-answers.component.html',
  styleUrls: ['./frequently-answers.component.scss']
})
export class FrequentlyAnswersComponent {
  @Output() navigateToOpenTicketEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {
  }

  siderbarList: 
  Array<
    {
      id: number,
      captionTitle: string,
      contentItem: {
        title: string,
        body?: {
          paragraphList: Array<{
            html?: string,
            image?: { url: string, width?: number },
            collapse?: { id: string, collapseTitle: string, collapseBodyHTML: string }
          }>
        }
      }
    }> = [
      {
        id: 1,
        captionTitle: "Come registro il mio account?",
        contentItem: {
          title: "Registrazione account",
          body: {
            paragraphList: [
              {
                html: `<span>Dalla schermata principale fare click sul pulsante "Registrati"</span> `,
                image: { url: "/assets/img/reg0.jpg", width: 200 }
              },
              {
                html: `<span>Oppure dalla pagina di login fare click sul pulsante "Registrati"</span> `,
                image: { url: "/assets/img/reg1.jpg" }
              },
              {
                html: `<span>Nella schermata successiva compilare tutti i campi obbligatori (1) e successivamente fare click sul pulsante "Crea Account" (2)</span>`,
                image: { url: "/assets/img/reg2.jpg" }
              },
              {
                html: `<span>A questo punto memorizza i dati usati nella registrazione e utilizzali per effettuare l'accesso.</span>`,
              }
            ]
          }
        }
      },
      {
        id: 2,
        captionTitle: "Come effettuo l'accesso?",
        contentItem: {
          title: "Accesso al tuo account",
          body: {
            paragraphList: [
              {
                html: `<span>Dalla schermata principale fare click sul pulsante "Accedi"</span> `,
                image: { url: "/assets/img/login1.jpg", width: 200 }
              },
              {
                html: `<span>Nella schermata successiva inserire username e password fare click sul pulsante "Accedi" (2).</span>`,
                image: { url: "/assets/img/login2.jpg"}
              },
              {
                html: `Puoi scegliere anche di ricordare l'username, spuntando la casella corrispondente.`
              }
            ]
          }
        }
      },
      {
        id: 3,
        captionTitle: "Come modifico la mia password?",
        contentItem: {
          title: "Modifica della password",
          body: {
            paragraphList: [
              {
                html: `<span>Dalla schermata principale fare click sull'icona profilo (1), e dal menù a tendina fare click su Impostazioni (2)</span> `,
                image: { url: "/assets/img/cp.jpg", width: 200 }
              },
              {
                html: `<span>Nella schermata successiva fare click su Modifica in corrispondenza di Modifica password (3)</span>`,
                image: { url: "/assets/img/cp2.jpg"}
              },
              {
                html: `Compilare i campi password, inserendo prima la password attuale (4) e poi la nuova password (5). Infine fare click sul pulsante Modifica per salvare le modifiche. (6)`,
                image: { url: "/assets/img/cp3.jpg", width: 400}
              }
            ]
          }
        }
      },
      {
        id: 4,
        captionTitle: "Come richiedo il reset della password?",
        contentItem: {
          title: "Reset password",
          body: {
            paragraphList: [
              {
                html: `<span>Dalla schermata principale fare click sul pulsante "Accedi"</span> `,
                image: { url: "/assets/img/login1.jpg", width: 200 }
              },
              {
                html: `<span>Nella schermata di login fare click su "Password Dimenticata"(1) </span> `,
                image: { url: "/assets/img/fp.jpg", width: 400 }
              },
              {
                html: `<span>Infine inserire il proprio username (2) e fare click sul pulsante recupera (3).</span>`,
                image: { url: "/assets/img/fp2.jpg", width: 400 }
              },
              {
                html: `<span>Riceverai una mail contenente le nuove credenziali.</span>`
              }
            ]
          }
        }
      },
      {
        id: 5,
        captionTitle: "Come creo un Account Artista?",
        contentItem: {
          title: "Verificare il proprio account come Artista",
          body: {
            paragraphList: [
              {
                html: `<span>Dalla schermata principale, nel menù di sinistra fare click sul pulsante "Verifica Account" </span> `,
                image: { url: "/assets/img/artist-verify-0.jpg", width: 200 }
              },
              {
                html: `<span>Nella schermata successiva inserire tutti i dati obbligatori, compreso il documento di identità e fare click sul tasto "Invia Richiesta".</span>`,
                image: { url: "/assets/img/artist-verify-1.png"}
              },
              {
                html: `Verrà così avviata la procedura di verifica dell'account.`,
                image: { url: "/assets/img/artist-verify-2.png"}
              },
              {
                html: `Una volta terminata la procedura ci sono due possibili esiti. Il primo nel quale la richiesta viene accettata e l'account è verificato con successo.`,
                image: { url: "/assets/img/artist-verify-3.png"}
              },
              {
                html: `Il secondo nel quale la richiesta è rifiutata. Dal giorno del rifiuto puoi riprovare la verifica trascorsi 90 giorni.`,
                image: { url: "/assets/img/artist-verify-4.png"}
              }
            ]
          }
        }
      },
      {
        id: 6,
        captionTitle: "Notifiche e Messaggi",
        contentItem: {
          title: "Problemi comuni con notifiche e messaggi",
          body: {
            paragraphList: [
              {
                collapse: {
                  id: "collapseNotificationHelp",
                  collapseTitle: "Impossibile ricevere notifiche in arrivo",
                  collapseBodyHTML: `<div class="mb-2">Prova i seguenti passaggi:</div>
                <div class="px-3">
                    <div class="mb-2">Per Unievent Desktop Web:</div>
                    <ul>
                        <li>Controlla la tua connessione di rete</li>
                        <li>Aggiorna la pagina</li>
                        <li>Riavvia il browser </li>
                    </ul>
                </div>`
                }
              }
            ]
          }
        }
      },
    ];
  selectedCaptionID: number = 1;

  changeSidebarElement(id: number) {
    this.selectedCaptionID = id;
  }


  openImage(imageUrl: string): void {
    this.getImageBase64(imageUrl).then(base64 => {
      const win = window.open();
      if (win) {
        const img = new Image();
        img.src = base64;
        win.document.body.appendChild(img);
      }
    });
  }

  async getImageBase64(url: string): Promise<string> {
    return this.http.get(url, { responseType: 'blob' })
      .toPromise()
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }

  bypassHtml(html: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  navigateToOpenTicket(){
    this.navigateToOpenTicketEvent.emit();
  }
}
