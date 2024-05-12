import { MAP_TYPE } from "../utility/global-constant";
import { ObjectMap } from "./objectMap";

export interface Map {
    t_map_id: number;
    t_map_event_id: number;
    t_map_name: string;
    t_map_total_seat: number;
    t_object_maps: Array<ObjectMap>;
    t_map_type: MAP_TYPE;
    t_map_num_rows?: number;
    t_map_num_column?: number;
}