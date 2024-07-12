import { USER_TYPE } from "../utility/global-constant";

export interface UserInfo {
    t_name: string;
    t_surname?: string;
    t_description?: string;
    t_alias_generated: string;
    t_type: USER_TYPE;
    t_profile_photo?: string;
}