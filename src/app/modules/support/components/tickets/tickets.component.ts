import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import moment from 'moment';
import { GlobalService } from 'src/app/core/services';
import { generateAlphanumericSequence, randomIntFromInterval } from 'src/app/core/utility/functions-constants';
import { ExtendedFile, ROUTE_LIST } from 'src/app/core/utility/global-constant';

@Component({
  selector: 'unievent-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent {
  currentTicketPanel: "ticket-list" | "ticket-new" = 'ticket-list';
  ticketDescription: string = '';
  characterCount: number = 0;
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  uploadedFiles: File[] = [];

  constructor(private router: Router, private globalService: GlobalService, private http: HttpClient, private cr: ChangeDetectorRef) {

  }

  updateCharacterCount() {
    if (this.ticketDescription.length > 1000) {
      this.ticketDescription = this.ticketDescription.slice(0, 1000);
    }
    this.characterCount = this.ticketDescription.length;
  }

  openImageUploadPanel() {
    // Simula il click sull'input del file
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


  removeUploadedFile(file: File) {
    // Rimuovi il file dalla lista dei file caricati
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
  }

  openTicket() {
    //Qui apri il ticket e lanci la modale (ticket aperto con successo oppure quella di errore)
  }

  /* Ticket List */

  setDataSourceAttributes() {
    this.ticketData.paginator = this.paginator;
    this.ticketData.sort = this.sort;
  }

  sort: MatSort;
  paginator: MatPaginator;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  ticketData: MatTableDataSource<any>;
  displayedColumns: string[] = ['description', 'status', 'actions'];

  ngOnInit(): void {
    const data: any[] = [];
    for (let i = 1; i <= 50; i++) {
      data.push({
        id: generateAlphanumericSequence(randomIntFromInterval(1,10000), 25),
        description: `Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i} Descrizione ${i}`,
        status: Math.random() < 0.5 ? 'Aperto' : Math.random() < 0.5 ? 'Chiuso' : 'Necessaria risposta',
        isScaduto: new Date(this.randomDate(new Date(2022, 0, 1), new Date())) < new Date()
      });
    }
    this.ticketData = new MatTableDataSource(data);
    this.ticketData.sort = this.sort;
    this.ticketData.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.cr.detectChanges();
  }

  randomDate(start: Date, end: Date): string {
    return moment(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString()).format("DD/MM/YYYY");
  }

  showDetails(ticket: any): void {
    const params = this.globalService.encodeParams({
      ticket: ticket
    });
    this.router.navigate([ROUTE_LIST.supports.detail, params]);
  }

  truncateDescription(description: string): string {
    const maxLength = 80;
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    } else {
      return description;
    }
  }

  openReviewsPanel() {

  }
}