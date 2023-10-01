import { EventPrice } from "./eventPrice";

export interface Event {
    t_title: string;
    t_image_link: string;
    t_address: string;
    t_cap: string;
    t_city: string;
    t_state: string;
    t_type?: string;
    t_external_link?: string;
    t_date: Date;
    t_sell_end: Date; //data di fine vendita dei biglietti per quell'evento
    t_price?: EventPrice;
    b_active: boolean;
    b_external_event: boolean; //Se evento esterno allora non è acquistabile il biglietto sul sito
    n_vendite?: number;
    n_click?: number;
}