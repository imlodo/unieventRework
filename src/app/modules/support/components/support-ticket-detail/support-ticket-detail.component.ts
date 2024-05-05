import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { pluck } from 'rxjs';
import { GlobalService } from 'src/app/core/services';
import { ExtendedFile } from 'src/app/core/utility/global-constant';

interface TicketDiscussion {
  id_user: number;
  alias: string,
  body: string;
  replyDateHour: string;
  role: string;
  attachments: string[];
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
  ticketReplyCaption: string = '';
  randomImage = this.createRandomImageFile(1000, 1000, 'random_image.png');
  @ViewChild('replyTicketContainer') replyTicketContainer: ElementRef;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2, private http: HttpClient, private globalService: GlobalService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    console.log(this.ticket.status)
    if (this.ticket.status != 'Chiuso') {
      document.body.classList.add('overflow-y-scroll-force');
      document.body.classList.remove('overflow-y-scroll-none');
    } else {
      document.body.classList.remove('overflow-y-scroll-force');
      document.body.classList.add('overflow-y-scroll-none');
    }
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

  getColorByStatus(status: string) {
    switch (status) {
      case "Chiuso":
        return 'color:red;'
      case "Aperto":
        return 'color:green;'
      case "Sollecito Riapertura" || "Necessaria Risposta":
        return 'color:orange;'
      default:
        return '';
    }
  }

  getTicketDiscussionById(id: number) {
    //Questo va recuperato dopo aver caricato il ticket
    this.discussionData = [
      {
        id_user: 1, alias: "mariobaldi", role: "Utente", replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Primo messaggio", attachments: [
          this.getFileObjectURL(this.randomImage),
          this.getFileObjectURL(this.randomImage),
          this.getFileObjectURL(this.randomImage)
        ]
      },
      {
        id_user: 2, alias: "operatore1", role: "Moderatore", replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Risposta al primo messaggio", attachments: [
          this.getFileObjectURL(this.randomImage),
          this.getFileObjectURL(this.randomImage)
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

  /*REPLY*/
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  uploadedFiles: File[] = [];
  countReplyCharacter: number = 0;

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
      // Aggiungi i file alla lista dei file caricati
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i) as ExtendedFile; // Cast esplicito a ExtendedFile
        if (file) {
          file.preview = this.createFilePreview(file); // Aggiungi la preview all'oggetto file
          this.uploadedFiles.push(file);
        }
      }

      // Limita la lista dei file caricati a un massimo di 4
      if (this.uploadedFiles.length > 4) {
        this.uploadedFiles = this.uploadedFiles.slice(0, 4);
      }
    }
  }

  createFilePreview(file: ExtendedFile): string {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Ottieni l'anteprima dell'immagine come URL base64
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
      //alias da cambiare con current_user_alias (anche role con current_user_role)
      id_user: 1, alias: "mariobaldi", role: "Utente", replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: this.ticketReplyCaption, attachments: uploadedFilesString
    });
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
    this.ticket.status = "Sollecito Riapertura";
    this.discussionData.push({id_user: this.currentUserId, alias: "mariobaldi", role:"Utente", replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Sollecito la riapertura di questo ticket", attachments:[]})
    this.scrollToBottom();
  }

}
