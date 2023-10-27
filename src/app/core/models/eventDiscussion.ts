import { UserInfo } from "./userInfo";

export interface EventDiscussion {
    n_id: number;
    t_object: string;
    t_body: string;
    t_image_link?: Array<string>;
    t_user: UserInfo;
}