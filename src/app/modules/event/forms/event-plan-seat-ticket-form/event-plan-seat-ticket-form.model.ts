import { prop } from "@rxweb/reactive-form-validators";
import { MAP_TYPE } from "src/app/core/utility/global-constant";

export class EventPlanSeatTicketFormModel {

    @prop()
    t_map_total_seat: number;
    @prop()
    t_map_type: MAP_TYPE;

    constructor() {
        this.t_map_total_seat = null;
        this.t_map_type = null;
    }
}
