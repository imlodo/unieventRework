import { UserInfo } from "./userInfo";

export interface EventReview {
    n_id: string | number;
    event_id: string|number; //da cambiare solo string quando collegato back-end
    n_stars: number; 
    t_title: string;
    t_body: string;
    t_image_link?: Array<string>;
    t_user: UserInfo;
    review_date?: string; //da rendere obbligatorio quando collegato back-end
}