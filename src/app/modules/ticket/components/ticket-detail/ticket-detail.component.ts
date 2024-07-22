import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import JsBarcode from 'jsbarcode';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { pluck } from 'rxjs';
import { GlobalService } from 'src/app/core/services';
import { TicketService } from 'src/app/core/services/ticketService/ticket.service';
import { OBJECT_MAP_TYPE, ROUTE_LIST, getTicketNameByType } from 'src/app/core/utility/global-constant';
@Component({
  selector: 'unievent-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements AfterViewInit {
  @ViewChild('barcodeImage') barcodeImage: ElementRef;
  @ViewChild('ticketPrint') ticketPrint: ElementRef;
  ticket: any;
  event: any;

  constructor(private ticketService: TicketService, private toastr: ToastrService,
    private route: ActivatedRoute, private router: Router, private globalService: GlobalService) {
    this.decodeParams();
    this.ticket = {
      id: this.generateRandomId(),
      type: {
        TABLE: {
          DISCOTECA: true
        }
      },
      price: 109.99
    };
    this.event = {
      title: "Titolo Evento",
      date: moment().format("DD/MM/YYYY HH:mm"),
      image_url: "/assets/img/event-image-placeholder.jpg"
    }
  }

  ngAfterViewInit(): void {
    this.generateBarcode(this.ticket.id);
  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        this.ticketService.getTicketDetail(decode.ticket.ticket_id).subscribe(
          (response: any) => {
            this.ticket = {
              id: response.ticket_id,
              type: response.ticket_type,
              price: response.price,
            }
            this.event = {
              title: response.event.t_title,
              date: response.event.t_event_date,
              image_url: response.event.t_image_link
            }
          },
          error => {
            this.toastr.clear();
            this.toastr.error('Errore nel recupero del ticket');
          }
        );
      }
      );
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
    }
  }

  getTicketNameByType() {
    return getTicketNameByType(this.ticket.type);
  }

  printTicket(): void {
    const printContents = this.ticketPrint.nativeElement.innerHTML;
    const popupWindow = window.open('', '_blank');
    popupWindow.document.open();
    popupWindow.document.write(`
      <html>
        <head>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <title>Biglietto</title>
          <style>
          .ticket-img {
            height: 150px;
            width: -webkit-fill-available;
            object-fit: cover
        }
        
        .ticket-img-container {
            width: 100%;
        }
        
        .barcodeimg {
            height: 100px;
            width: -webkit-fill-available;
            object-fit: cover;
        }
        .ticket-container{
          border: 1px dashed black;
          width: 800px !important;
        }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWindow.document.close();
  }

  navigateToSupport(){
    this.router.navigate([ROUTE_LIST.supports.basepath])
  }
}
