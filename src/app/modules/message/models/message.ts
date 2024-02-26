import { Moment } from "moment";
import { User } from "src/app/core/models/user";

export interface Message {
    user_to: User;
    user_at: User;
    message: string;
    dateTime: Moment
}