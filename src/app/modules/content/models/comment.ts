import { User } from "src/app/core/models/user";

export interface Comment {
    discussion_id: string;
    body: string;
    like_count: number;
    children?: Comment[];
    t_user: User;
    created_date:string;
    t_alias_generated_reply?:string;
    is_liked_by_current_user: boolean;
}