import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { EventBestTicketFormModel } from './event-best-ticket-form.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EventBuyTicketRequest } from '../../models/eventBuyTicketRequest';

@Component({
  selector: 'unievent-event-best-ticket-form',
  templateUrl: './event-best-ticket-form.component.html',
  styleUrls: ['./event-best-ticket-form.component.scss']
})
export class EventBestTicketFormComponent {
  form: FormGroup;
  formRows: FormArray<FormGroup>;
  eventTitle: string;
  @Output() onBuyTicket: EventEmitter<Array<EventBuyTicketRequest>> = new EventEmitter<Array<EventBuyTicketRequest>>();

  constructor(private formBuilder: RxFormBuilder) { }

  createForm() {
    this.formRows = new FormArray([]);
  }

  addFormToArray(ebtfm: EventBestTicketFormModel) {
    const form = this.formBuilder.formGroup(ebtfm);
    this.formRows.push(form);
  }

  get n_id_ticket() {
    return this.form.get("n_id_ticket").value;
  }
  get n_ticket() {
    return this.form.get("n_ticket").value;
  }
  get ticket_title() {
    return this.form.get("n_id_ticket").value;
  }
  get ticket_price() {
    return this.form.get("ticket_price").value;
  }
  get ticket_person_limit() {
    return this.form.get("ticket_person_limit").value;
  }
  get ticket_is_available() {
    return this.form.get('ticket_is_available').value;
  }
  get ticket_avilable_seat() {
    return this.form.get('ticket_avilable_seat').value;
  }

  set n_id_ticket(n_id_ticket: number) {
    this.form.get("n_id_ticket").setValue(n_id_ticket);
  }
  set n_ticket(n_ticket: number) {
    this.form.get("n_ticket").setValue(n_ticket);
  }
  set ticket_title(ticket_title: string) {
    this.form.get("ticket_title").setValue(ticket_title);
  }
  set ticket_price(ticket_price: number) {
    this.form.get("ticket_price").setValue(ticket_price);
  }
  set ticket_person_limit(ticket_person_limit: number) {
    this.form.get("ticket_person_limit").setValue(ticket_person_limit);
  }
  set ticket_is_available(ticket_is_available: boolean) {
    this.form.get('ticket_is_available').setValue(ticket_is_available);
  }
  set ticket_avilable_seat(ticket_avilable_seat: number) {
    this.form.get("ticket_avilable_seat").setValue(ticket_avilable_seat);
  }

  isValid(): boolean {
    return this.formRows.status === "INVALID" ? false : true;
  }

  incrementTicket(index: number) {
    let n_ticket_value = this.formRows.controls[index].get("n_ticket").value;
    let n_ticket_limit = this.formRows.controls[index].get("ticket_person_limit").value;
    let n_ticket_avilable_seat = this.formRows.controls[index].get("ticket_avilable_seat").value;
    if (n_ticket_value < n_ticket_limit && n_ticket_value < n_ticket_avilable_seat) {
      this.formRows.controls[index].get("n_ticket").setValue(n_ticket_value + 1);
    }
  }

  decrementTicket(index: number) {
    let n_ticket_value = this.formRows.controls[index].get("n_ticket").value;
    if (n_ticket_value > 0) {
      this.formRows.controls[index].get("n_ticket").setValue(n_ticket_value - 1);
    }
  }

  getTicketCount() {
    let countTicket = 0;
    this.formRows.controls.forEach(el => {
      countTicket += el.get("n_ticket").value;
    });
    return countTicket;
  }

  getTicketAmount() {
    let countTicketAmount = 0;
    this.formRows.controls.forEach(el => {
      if (el.get("n_ticket").value > 0)
        countTicketAmount += el.get("ticket_price").value * el.get("n_ticket").value;
    });
    return countTicketAmount;
  }

  disableIncrement(index: number) {
    let form = this.formRows.controls[index];
    let n_ticket_value = form.get("n_ticket").value;
    let n_ticket_limit = form.get("ticket_person_limit").value;
    let n_ticket_avilable_seat = form.get("ticket_avilable_seat").value;
    if (n_ticket_value >= n_ticket_limit || n_ticket_avilable_seat < 0 || n_ticket_value >= n_ticket_avilable_seat) {
      return true;
    }
    return false;
  }

  disableDecrement(index: number) {
    let form = this.formRows.controls[index];
    if (form.get("n_ticket").value <= 0 || form.get("ticket_avilable_seat").value < 0) {
      return true;
    }
    return false;
  }

  buyTicket() {
    let eventBuyTicketRequestList:Array<EventBuyTicketRequest> = [];
    this.formRows.controls.forEach(el => {
      if(el.get("n_ticket").value > 0){
        let eventBuyTicketRequest: EventBuyTicketRequest = {
          n_event_id: -1,
          n_object_id: el.get("n_id_ticket").value,
          n_quantity: el.get("n_ticket").value,
          n_id_map: -1
        }
        eventBuyTicketRequestList.push(eventBuyTicketRequest);
      }
    });
    this.onBuyTicket.emit(eventBuyTicketRequestList);
  }

}
