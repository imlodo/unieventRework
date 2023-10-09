import { EVENT_TYPE } from "../utility/global-constant";
import { EventArtist } from "./eventArtist";
import { EventBooking } from "./eventBooking";
import { EventTicketPrice } from "./eventBottleTicketPrice";
import { CompanyUser } from "./companyUser";
import { EventLocation } from "./eventLocation";
import { EventReview } from "./eventReview";
import { EventServicePrice } from "./eventServicePrice";

export interface Event {
    n_id: number;
    n_group_id?: number; //Per lo stesso evento in + location
    t_title: string;
    t_image_link: string;
    t_description?: string;
    t_type: EVENT_TYPE;
    t_location: EventLocation;
    t_event_dates: Array<Date>; //Da quando a quando, considerare anche gli orari
    t_sell_end: Date; //data di fine vendita dei biglietti per quell'evento
    t_price?: Array<EventTicketPrice>;
    t_service_price?: Array<EventServicePrice>;
    t_reviews?: Array<EventReview>;
    t_bookings_list?: Array<EventBooking>
    t_external_link?: string;
    t_artist_list?: Array<EventArtist>;
    t_company?: CompanyUser;
    b_external_event: boolean; //Se evento esterno allora non è acquistabile il biglietto sul sito
    b_active: boolean;
    t_day_sell_max?: number;
    t_total_sell_max?: number;
    n_vendite?: number;
    n_click?: number;
    
}