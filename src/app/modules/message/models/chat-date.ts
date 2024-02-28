import { User } from "src/app/core/models/user";
import { Message } from "./message";

export interface ChatDate{
    userChat : User;
    messages: { [date: string]: Message[]; }
}
