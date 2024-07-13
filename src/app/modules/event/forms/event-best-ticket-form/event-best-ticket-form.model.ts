import { prop } from "@rxweb/reactive-form-validators";

export class EventBestTicketFormModel {

    @prop()
    n_ticket:number;
    @prop()
    n_id_ticket:number;
    @prop()
    ticket_title:string;
    @prop()
    ticket_price:number;
    @prop()
    ticket_person_limit:number;
    @prop()
    ticket_is_available:boolean;
    @prop()
    ticket_avilable_seat:number;
    @prop()
    ticket_map_id:number;

    constructor() {
        this.n_ticket = null;
        this.n_id_ticket = null;
        this.ticket_title = null;
        this.ticket_price = null;
        this.ticket_person_limit = null;
        this.ticket_is_available = null;
        this.ticket_avilable_seat = null;
        this.ticket_map_id = null;
    }
}
