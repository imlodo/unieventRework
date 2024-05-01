import { Component, ElementRef, ViewChild } from '@angular/core';

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
        this.uploadedFiles.push(files.item(i));
      }
  
      // Limita la lista dei file caricati a un massimo di 4
      if (this.uploadedFiles.length > 4) {
        this.uploadedFiles = this.uploadedFiles.slice(0, 4);
      }
    }
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
}