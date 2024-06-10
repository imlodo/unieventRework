import { Injectable } from '@angular/core';
import moment from 'moment';

export interface VisitedPage {
  url: string;
  date: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class VisitedPagesService {
  private visitedPages: VisitedPage[] = [];
  private readonly maxPages: number = 100;

  constructor() {
    // Recupera le pagine visitate dal sessionStorage
    const storedPages = sessionStorage.getItem('visitedPages');
    if (storedPages) {
      this.visitedPages = JSON.parse(storedPages);
    }
  }

  public addVisitedPage(url: string, title: string): void {
    const date = moment().format('DD/MM/YYYY HH:mm:ss');
    const message = `Hai visitato la pagina: "${title}"`;

    // Verifica se il numero di pagine ha raggiunto il limite massimo
    if (this.visitedPages.length >= this.maxPages) {
      this.visitedPages.shift(); // Rimuovi la pagina più vecchia
    }

    // Aggiungi la nuova pagina all'array
    this.visitedPages.push({ url, date, message });

    // Salva l'array aggiornato nel sessionStorage
    sessionStorage.setItem('visitedPages', JSON.stringify(this.visitedPages));
  }

  public getVisitedPages(): VisitedPage[] {
    return this.visitedPages;
  }
}
