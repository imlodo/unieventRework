import { EVENT_TYPE } from "../utility/global-constant";
import { EventArtist } from "./eventArtist";
import { UserInfo } from "./userInfo";
import { EventLocation } from "./eventLocation";
import { EventReview } from "./eventReview";
import { EventService } from "./eventService";
import { EventDiscussion } from "./eventDiscussion";
import { Map } from "./map";

export interface Event {
    n_id: number;
    n_group_id?: number;
    n_click: number;
    t_title: string;
    t_description?: string;
    t_image_link: string; 
    t_external_link?: string;
    t_event_date: Date; //Data Evento, considerare anche gli orari
    t_service_list?: Array<EventService>;
    t_map_list: Array<Map>;
    t_reviews?: Array<EventReview>;
    t_discussions?: Array<EventDiscussion>;
    t_artist_list?: Array<EventArtist>;
    t_company?: UserInfo;
    t_location: EventLocation;
    t_type: EVENT_TYPE;
    b_external_event: boolean; //Se evento esterno allora non è acquistabile il biglietto sul sito
    b_active: boolean;   
}