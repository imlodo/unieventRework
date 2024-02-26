import { User } from "src/app/core/models/user";
import { Message } from "./message";

export interface Chat{
    userChat : User;
    messages: Array<Message>
}