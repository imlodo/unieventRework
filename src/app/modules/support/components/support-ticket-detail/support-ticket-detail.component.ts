import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { pluck } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { GlobalService } from 'src/app/core/services';
import { SupportService } from 'src/app/core/services/supportService/support.service';
import { ExtendedFile, ROUTE_LIST, TICKET_STATUS, USER_ROLE } from 'src/app/core/utility/global-constant';
import { FileUploadService } from 'src/app/modules/content/services/file-upload-service/file-upload-service';

interface TicketDiscussion {
  alias: string,
  body: string;
  replyDateHour: string;
  role: USER_ROLE;
  attachments: string[];
}

interface TicketDetail {
  id: string;
  discussion_list: TicketDiscussion[];
}

export interface Ticket {
  id: string;
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
  @ViewChild('replyListContainer') replyListContainer: ElementRef;
  uploadedFiles: File[] = [];
  countReplyCharacter: number = 0;
  isModerator: boolean = false;
  fileUrls: Array<string> = new Array();

  constructor(private cdr: ChangeDetectorRef, private cookieService: CookieService, private renderer: Renderer2, private http: HttpClient,
    private globalService: GlobalService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
    private supportService: SupportService, private toastr: ToastrService, private fileService: FileUploadService) {
    const cookieCurrentUser = this.cookieService.get('current_user');
    if (cookieCurrentUser) {
      this.currentUser = JSON.parse(cookieCurrentUser);
    }
    if(this.currentUser.t_role !== "Utente"){
      this.isModerator = true;
    }
  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.updateGlobalScroll()
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

  updateGlobalScroll() {
    document.getElementsByTagName("body")[0].scrollTo(0, 0);
    if (this.ticket.status != TICKET_STATUS.Aperto && this.ticket.status != TICKET_STATUS.NecessariaRisposta && !this.isModerator) {
      document.body.classList.remove('overflow-y-scroll-force');
      document.body.classList.add('overflow-y-scroll-none');
    } else {
      document.body.classList.add('overflow-y-scroll-force');
      document.body.classList.remove('overflow-y-scroll-none');
    }
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

  getTicketDiscussionById(id: string) {
    this.supportService.getSupportTicketDiscussionList(id).subscribe(
      (response: any) => {
        this.discussionData = response;
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore non è stato possibile recuperare la tua richiesta di supporto' );
      }
    );
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
          this.fileService.uploadFileAzure(file).subscribe(event => {
            this.fileUrls.push(event.body.url);
          }, error => {
          });
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

    let mimeType = 'application/octet-stream';
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

    let reply = {
      alias: this.currentUser.t_alias_generated, role: this.currentUser.t_role, replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: this.ticketReplyCaption, attachments: this.fileUrls
    }
    this.supportService.addSupportTicketReply(this.ticket.id, this.ticketReplyCaption, this.fileUrls, !this.isModerator ? TICKET_STATUS.AttesaRisposta : TICKET_STATUS.Aperto ).subscribe(
      (response: any) => {
        this.toastr.clear();
        this.toastr.success(response.message);
        this.discussionData.push(reply);
        this.ticket.status = !this.isModerator ? TICKET_STATUS.AttesaRisposta : TICKET_STATUS.NecessariaRisposta;
        this.updateGlobalScroll();
        this.resetReplyFields();
        this.updateDetail(this.ticket)
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore non è stato possibile aggiungere una risposta, riprova più tardi' );
      }
    );
  }

  updateDetail(ticket: Ticket): void {
    const params = this.globalService.encodeParams({
      ticket: ticket
    });
    this.router.navigate([ROUTE_LIST.supports.detail, params]);
  }

  resetReplyFields() {
    this.uploadedFiles = [];
    this.ticketReplyCaption = "";
    this.countReplyCharacter = 0;
    this.scrollToBottom();
  }

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
    this.supportService.addSupportTicketReply(this.ticket.id, "Sollecito la riapertura di questo ticket", [], TICKET_STATUS.SollecitoRiapertura ).subscribe(
      (response: any) => {
        this.toastr.clear();
        this.toastr.success("Sollecito inviato con successo");
        this.discussionData.push({ alias: this.currentUser.t_alias_generated, role: this.currentUser.t_role, replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Sollecito la riapertura di questo ticket", attachments: [] })
        this.ticket.status = TICKET_STATUS.SollecitoRiapertura;
        this.updateGlobalScroll();
        this.resetReplyFields();
        this.updateDetail(this.ticket);
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore non è stato possibile inviare il sollecito, riprova più tardi' );
      }
    );
    this.scrollToBottom();
  }

  reOpenTicket(){
    this.ticket.status = TICKET_STATUS.Aperto;
    this.supportService.addSupportTicketReply(this.ticket.id, "Dopo un\'attenta analisi del ticket, ho deciso di riaprirlo.", [], TICKET_STATUS.Aperto).subscribe(
      (response: any) => {
        this.toastr.clear();
        this.toastr.success("Ticket riaperto con successo");
        this.discussionData.push({ alias: this.currentUser.t_alias_generated, role: this.currentUser.t_role, replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Dopo un\'attenta analisi del ticket, ho deciso di riaprirlo.", attachments: [] })
        this.ticket.status = TICKET_STATUS.Aperto;
        this.updateGlobalScroll();
        this.resetReplyFields();
        this.updateDetail(this.ticket);
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore non è stato possibile riaprire il ticket, riprova più tardi' );
      }
    );
    this.updateGlobalScroll();
    this.scrollToBottom();
  }

  closeTicket(){
    this.ticket.status = TICKET_STATUS.Chiuso;
    this.supportService.addSupportTicketReply(this.ticket.id, "Ticket chiuso.", [], TICKET_STATUS.Chiuso).subscribe(
      (response: any) => {
        this.toastr.clear();
        this.toastr.success("Ticket chiuso con successo");
        this.discussionData.push({ alias: this.currentUser.t_alias_generated, role: this.currentUser.t_role, replyDateHour: moment().format("DD/MM/YYYY hh:mm"), body: "Ticket chiuso.", attachments: [] })
        this.ticket.status = TICKET_STATUS.Chiuso;
        this.updateGlobalScroll();
        this.resetReplyFields();
        this.updateDetail(this.ticket);
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Errore non è stato possibile riaprire il ticket, riprova più tardi' );
      }
    );
    this.updateGlobalScroll();
    this.scrollToBottom();
  }

}
