import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TicketsComponent } from '../tickets/tickets.component';

@Component({
  selector: 'unievent-support-and-help',
  templateUrl: './support-and-help.component.html',
  styleUrls: ['./support-and-help.component.scss']
})
export class SupportAndHelpComponent {
  selectedSection: string = "FrequentlyAnswers";
  @ViewChild('ticketsComponent', { static: false }) ticketsComponent: TicketsComponent;

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
}
