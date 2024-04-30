import { HttpClient } from '@angular/common/http';
import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'unievent-frequently-answers',
  templateUrl: './frequently-answers.component.html',
  styleUrls: ['./frequently-answers.component.scss']
})
export class FrequentlyAnswersComponent {
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
            image?: { url: string, width: number },
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
                image: { url: "/assets/img/reg1.jpg", width: 500 }
              },
              {
                html: `<span>Nella schermata successiva compilare tutti i campi obbligatori (1) e successivamente fare click sul pulsante "Crea Account" (2)</span>`,
                image: { url: "/assets/img/reg2.jpg", width: 500 }
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
                image: { url: "/assets/img/login2.jpg", width: 500 }
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
}
