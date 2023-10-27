import { OBJECT_MAP_TYPE } from "../utility/global-constant";
import { Seat } from "./seat";

export interface ObjectMap {
    n_id: number;
    n_id_event: number;
    n_min_num_person?: number;
    n_max_num_person?: number;
    n_limit_buy_for_person?: number;
    n_object_price: number;
    t_map_cord_x: number;
    t_map_cord_y: number;
    t_map_cord_z: number;
    t_note?: string;
    t_type: OBJECT_MAP_TYPE;
    t_seat_list: Array<Seat>;
}