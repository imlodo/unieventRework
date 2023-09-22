import { minLength, pattern, prop, required } from "@rxweb/reactive-form-validators";
import { messages, regex_form_control } from "../../utility/form-constant";

export class LoginFormDataModel {

    @required({ message: messages.t_username.required })
    t_username: string;

    @pattern({ expression: { alphaNumeric: regex_form_control.t_password_regex }, message: messages.t_password.pattern})
    @required({ message: messages.t_password.required})
    @minLength({value:4, message: messages.t_password.minLenght})
    t_password: string;

    constructor() {
        this.t_username = null;
        this.t_password = null;
    }
}
