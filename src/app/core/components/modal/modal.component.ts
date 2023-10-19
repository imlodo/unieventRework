import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'unievent-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  modalData: {
    action: string;
    event: CalendarEvent;
  };
}
