import { User } from "src/app/core/models/user";

export interface Comment {
    discussion_id: number;
    body: string;
    like_count: number;
    children?: Comment[];
    t_user: User;
    created_date:Date;
}