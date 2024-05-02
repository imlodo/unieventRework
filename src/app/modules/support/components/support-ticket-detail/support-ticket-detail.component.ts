import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { pluck } from 'rxjs';
import { GlobalService } from 'src/app/core/services';

interface TicketDiscussion {
  id_user: number;
  alias: string,
  body: string;
  replyDateHour: string;
  role: string;
  attachments: File[];
}

interface TicketDetail {
  id: number;
  discussion_list: TicketDiscussion[];
}

interface Ticket {
  id: number;
  description: string;
  status: string;
  isScaduto: boolean;
}

@Component({
  selector: 'unievent-support-ticket-detail',
  templateUrl: './support-ticket-detail.component.html',
  styleUrls: ['./support-ticket-detail.component.scss']
})
export class SupportTicketDetailComponent implements AfterViewInit {

  ticket: Ticket;
  discussionData: TicketDiscussion[];
  currentUserId: number = 1;

  constructor(private cdr: ChangeDetectorRef, private globalService: GlobalService, private route: ActivatedRoute, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.cdr.detectChanges();
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        if (decode.ticket) {
          this.ticket = decode.ticket;
          this.getTicketDiscussionById(this.ticket.id);
          this.createTicketDetail(this.ticket, this.discussionData);
        }
      }
      );
  }

  getTicketDiscussionById(id: number) {
    //Questo va recuperato dopo aver caricato il ticket
    this.discussionData = [
      {
        id_user: 1, alias: "mariobaldi", role: "Utente", replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Primo messaggio", attachments: [
          this.createRandomImageFile(1000, 1000, 'random_image.png'),
          this.createRandomImageFile(1000, 1000, 'random_image2.png'),
          this.createRandomImageFile(1000, 1000, 'random_image3.png')
        ]
      },
      {
        id_user: 2, alias: "operatore1", role: "Moderatore", replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Risposta al primo messaggio", attachments: [
          this.createRandomImageFile(1000, 1000, 'random_image4.png'),
          this.createRandomImageFile(1000, 1000, 'random_image5.png')
        ]
      },
      { id_user: 3, alias: "operatore2", role: "Super Moderatore", replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Attenzione ho provveduto a chiudere il ticket poichè non hai risposto per 48h", attachments: [] }
    ];
  }

  createTicketDetail(ticket: Ticket, discussionList: TicketDiscussion[]): TicketDetail {
    return {
      id: ticket.id,
      discussion_list: discussionList
    };
  }

  openPanelForReOpeningReminder() {

  }

  generateRandomImageData(width: number, height: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imageData = ctx.createImageData(width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = Math.floor(Math.random() * 256); // Red
      imageData.data[i + 1] = Math.floor(Math.random() * 256); // Green
      imageData.data[i + 2] = Math.floor(Math.random() * 256); // Blue
      imageData.data[i + 3] = 255; // Alpha
    }
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL();
  }

  createRandomImageFile(width: number, height: number, fileName: string): File {
    const imageData = this.generateRandomImageData(width, height);
    const blob = this.dataURItoBlob(imageData);
    return new File([blob], fileName, { type: 'image/png' });
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  getUrlImage(file:File){
    return URL.createObjectURL(file);
  }

}
