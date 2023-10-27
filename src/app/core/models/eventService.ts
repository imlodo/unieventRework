import { EVENT_SERVICE_TYPE } from "../utility/global-constant";
export interface EventService {
    n_service_id:number;
    n_id_event: number;
    n_price: number;
    t_service_name:string;
    t_description: string;
    t_image_link_list: Array<string>;
    t_type: EVENT_SERVICE_TYPE;
}