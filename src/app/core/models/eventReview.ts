import { UserInfo } from "./userInfo";

export interface EventReview {
    t_user: UserInfo,
    t_review: string, 
    n_stars: number 
}