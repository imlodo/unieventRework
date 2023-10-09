//Es. se le persone min sono 6 e il tavolo ne accetta max 10, e ho prenotato un tavolo per il ticket_price si fa / numero persone prenotate per quel tavolo

import { EVENT_TICKET_TYPE } from "../utility/global-constant";

//Ovvero es. ticket_price: 300€, numero persone tavolo = 6, a testa pagano 50€, se invece numero persone tavolo 10 , allora a testa pagano 30€
export interface EventTicketPrice {
    n_id: number;
    ticket_price: number;
    table_min_num_person?: number;
    table_max_num_person?: number;
    t_type: EVENT_TICKET_TYPE;
    t_note?: string;
}