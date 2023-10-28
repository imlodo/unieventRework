import { ObjectMap } from "./objectMap";

export interface Map {
    t_map_id: number;
    t_map_event_id: number;
    t_map_name: string;
    t_map_total_seat: number;
    t_object_maps: Array<ObjectMap>;
}