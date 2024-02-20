import { Moment } from "moment";
import { NOTIFICATION_TYPE } from "../utility/enum-constant";

export interface Notification {
    notification_id: number;
    user_id: number;
    type: NOTIFICATION_TYPE; 
    body: string;
    image: string;
    action_link: string;
    creationDateTime: Moment;
}