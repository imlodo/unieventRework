import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { pluck } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { GlobalService } from 'src/app/core/services';
import { ExtendedFile, TICKET_STATUS, USER_ROLE } from 'src/app/core/utility/global-constant';

interface TicketDiscussion {
  alias: string,
  body: string;
  replyDateHour: string;
  role: USER_ROLE;
  attachments: string[];
}

interface TicketDetail {
  id: number;
  discussion_list: TicketDiscussion[];
}

export interface Ticket {
  id: number;
  description: string;
  status: TICKET_STATUS;
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
  currentUser: User;
  ticketReplyCaption: string = '';
  randomImage = this.createRandomImageFile(1000, 1000, 'random_image.png');
  @ViewChild('replyTicketContainer') replyTicketContainer: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  uploadedFiles: File[] = [];
  countReplyCharacter: number = 0;

  constructor(private cdr: ChangeDetectorRef, private cookieService: CookieService, private renderer: Renderer2, private http: HttpClient, private globalService: GlobalService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.currentUser = JSON.parse(cookieCurrentUser);
    }
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.updateGlobalScroll()
    this.cdr.detectChanges();
  }

  updateGlobalScroll() {
    document.getElementsByTagName("body")[0].scrollTo(0, 0);
    if (this.ticket.status != TICKET_STATUS.Aperto && this.ticket.status != TICKET_STATUS.NecessariaRisposta) {
      document.body.classList.remove('overflow-y-scroll-force');
      document.body.classList.add('overflow-y-scroll-none');
    } else {
      document.body.classList.add('overflow-y-scroll-force');
      document.body.classList.remove('overflow-y-scroll-none');
    }
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

  getColorByStatus(status: TICKET_STATUS): string {
    const statusColors: { [key: string]: string } = {
      [TICKET_STATUS.Chiuso]: 'color:red;',
      [TICKET_STATUS.Aperto]: 'color:green;',
      [TICKET_STATUS.SollecitoRiapertura]: 'color:orange;',
      [TICKET_STATUS.NecessariaRisposta]: 'color:yellow;',
      [TICKET_STATUS.AttesaRisposta]: 'color:white;'
    };

    const color = statusColors[status];

    return color || '';
  }

  getTicketDiscussionById(id: number) {
    //Questo va recuperato dopo aver caricato il ticket
    this.discussionData = [
      {
        alias: this.currentUser.t_alias_generated, role: this.currentUser.t_role, replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Primo messaggio", attachments: [
          this.getFileObjectURL(this.randomImage),
          this.getFileObjectURL(this.randomImage),
          this.getFileObjectURL(this.randomImage)
        ]
      },
      {
        alias: "operatore1", role: USER_ROLE.Moderatore, replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Risposta al primo messaggio", attachments: [
          this.getFileObjectURL(this.randomImage),
          this.getFileObjectURL(this.randomImage)
        ]
      },
      { alias: "operatore2", role: USER_ROLE.SuperModeratore, replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Attenzione ho provveduto a chiudere il ticket poichè non hai risposto per 48h", attachments: [] }
    ];
  }

  createTicketDetail(ticket: Ticket, discussionList: TicketDiscussion[]): TicketDetail {
    return {
      id: ticket.id,
      discussion_list: discussionList
    };
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

  getUrlImage(file: File) {
    if (file)
      return URL.createObjectURL(file);
    return '';
  }

  changeTicketCaptionControl() {
    if (this.ticketReplyCaption.length > 1000) {
      this.ticketReplyCaption = this.ticketReplyCaption.slice(0, 1000);
    }
  }

  updateCharacterCount() {
    this.countReplyCharacter = this.ticketReplyCaption.length;
  }

  openImageUploadPanel() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(fileInput: HTMLInputElement) {
    const files = fileInput.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i) as ExtendedFile; 
        if (file) {
          file.preview = this.createFilePreview(file);
          this.uploadedFiles.push(file);
        }
      }

      if (this.uploadedFiles.length > 4) {
        this.uploadedFiles = this.uploadedFiles.slice(0, 4);
      }
    }
  }

  createFilePreview(file: ExtendedFile): string {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        file.preview = reader.result;
      }
    };
    return '';
  }

  openImage(fileString: string): void {
    this.getImageBase64(fileString).then(base64 => {
      const win = window.open();
      if (win) {
        const img = new Image();
        img.src = base64;
        win.document.body.appendChild(img);
      }
    });
  }

  downloadFile(fileUrl: string): void {
    this.getFileBase64(fileUrl).then(base64 => {
      const blob = this.base64ToBlob(base64);
      const blobUrl = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = this.getFileNameFromUrl(fileUrl);
      anchor.click();

      // Pulisce l'URL del Blob dopo il download
      URL.revokeObjectURL(blobUrl);
    });
  }

  removeUploadedFile(file: File) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
  }

  async getFileBase64(url: string): Promise<string> {
    return this.http.get(url, { responseType: 'blob' })
      .toPromise()
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }

  getFileNameFromUrl(url: string): string {
    // Ottiene il nome del file dalla URL
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  base64ToBlob(base64: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Determina il tipo MIME in base all'intestazione della stringa base64
    let mimeType = 'application/octet-stream'; // Tipo MIME di default
    if (base64.startsWith('data:image/jpeg')) {
      mimeType = 'image/jpeg';
    } else if (base64.startsWith('data:image/png')) {
      mimeType = 'image/png';
    }

    return new Blob([byteArray], { type: mimeType });
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

  getFileObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }

  setBlobUrl(file: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  onLoadImage(event: Event, file: File) {
    URL.revokeObjectURL((event.target as any).src);
  }

  sendReply() {
    let uploadedFilesString = this.uploadedFiles.map(el => this.getUrlImage(el));
    this.discussionData.push({
      alias: this.currentUser.t_alias_generated, role: this.currentUser.t_role, replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: this.ticketReplyCaption, attachments: uploadedFilesString
    });
    this.ticket.status = TICKET_STATUS.AttesaRisposta;
    this.updateGlobalScroll();
    this.resetReplyFields();
  }

  resetReplyFields() {
    this.uploadedFiles = [];
    this.ticketReplyCaption = "";
    this.countReplyCharacter = 0;
    this.scrollToBottom();
  }

  @ViewChild('replyListContainer') replyListContainer: ElementRef;

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        const container = this.replyListContainer.nativeElement;
        this.renderer.setProperty(container, 'scrollTop', container.scrollHeight);
      }, 100)
    } catch (err) { }
  }

  sendReOpeningReminder() {
    this.ticket.status = TICKET_STATUS.SollecitoRiapertura;
    this.updateGlobalScroll();
    this.discussionData.push({ alias: this.currentUser.t_alias_generated, role: this.currentUser.t_role, replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Sollecito la riapertura di questo ticket", attachments: [] })
    this.scrollToBottom();
  }

}
