import { OBJECT_MAP_TYPE } from "../utility/global-constant";
import { Seat } from "./seat";

export interface ObjectMap {
    n_id: number;
    n_id_map: number;
    n_min_num_person?: number;
    n_max_num_person?: number;
    n_limit_buy_for_person?: number;
    n_object_price?: number;
    t_object_commissions?: { commission_price: number, commission_type: string };
    n_obj_map_cord_x: number;
    n_obj_map_cord_y: number;
    n_obj_map_cord_z: number;
    n_obj_map_width: number;
    n_obj_map_height: number;
    n_obj_map_fill?: string;
    n_obj_map_text?: string;
    t_note?: string;
    t_type: OBJECT_MAP_TYPE;
    t_seat_list: Array<Seat>;
    is_acquistabile: boolean;
}