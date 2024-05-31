import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TicketsComponent } from '../tickets/tickets.component';
import { GlobalService } from 'src/app/core/services';
import { pluck } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'unievent-support-and-help',
  templateUrl: './support-and-help.component.html',
  styleUrls: ['./support-and-help.component.scss']
})
export class SupportAndHelpComponent {
  selectedSection: string = "FrequentlyAnswers";
  @ViewChild('ticketsComponent', { static: false }) ticketsComponent: TicketsComponent;

  constructor(private cdr: ChangeDetectorRef,private globalService: GlobalService, private route: ActivatedRoute) {

  }

  ngAfterViewInit(): void {
    this.decodeParams();
    this.cdr.detectChanges();
  }

  changeSection(section: string) {
    this.selectedSection = section;
  }

  navigateToNewTicket() {
    this.selectedSection = "Tickets";
    setTimeout(() => {
      if (this.ticketsComponent) {
        this.ticketsComponent.currentTicketPanel = "ticket-new";
      }
    }, 1)

  }

  decodeParams() {
    this.route.params
      .pipe(pluck('params'))
      .subscribe((result) => {
        const decode = this.globalService.decodeParams(result);
        if (decode.ticket) {
          this.selectedSection = "Tickets";
        }
      }
      );
  }
}
