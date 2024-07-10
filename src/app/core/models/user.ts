import { USER_ROLE, USER_TYPE } from "../utility/global-constant";

export interface User {
    t_username?: string;
    t_password?: string;
    t_name: string;
    t_surname?: string;
    t_alias_generated: string;
    t_description?: string;
    t_profile_photo: string;
    is_verified?: boolean; // Rendere obbligatorio
    t_type: USER_TYPE;
    t_role?: USER_ROLE;
    t_follower_number?: number;
}