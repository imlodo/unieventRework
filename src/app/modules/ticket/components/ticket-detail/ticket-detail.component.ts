import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'unievent-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements AfterViewInit {
  @ViewChild('barcodeImage') barcodeImage: ElementRef;
  ticket: any;

  constructor() {
    this.ticket = {
      id: this.generateRandomId(),
    };
  }

  ngAfterViewInit(): void {
    this.generateBarcode(this.ticket.id);
  }

  generateRandomId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomId = '';
    for (let i = 0; i < 12; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomId;
  }

  generateBarcode(id: string): void {
    if (this.barcodeImage) {
      JsBarcode(this.barcodeImage.nativeElement, id, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 14,
        textMargin: 5
      });
    } else {
      console.error('Elemento barcodeImage non trovato nel DOM.');
    }
  }
}
