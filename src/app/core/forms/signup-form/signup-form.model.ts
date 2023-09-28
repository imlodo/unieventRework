import { minLength, pattern, prop, required } from "@rxweb/reactive-form-validators";
import { messages, regex_form_control } from "../../utility/form-constant";

export class SignUpFormDataModel {

    @required({ message: messages.t_name.required })
    @minLength({ value: 2, message: messages.t_name.minLenght })
    t_name: string;
    
    @required({ message: messages.t_surname.required })
    @minLength({ value: 2, message: messages.t_surname.minLenght })
    t_surname: string;

    @required({ message: messages.t_username.required })
    t_username: string;

    @pattern({ expression: { alphaNumeric: regex_form_control.t_password_regex }, message: messages.t_password.pattern })
    @required({ message: messages.t_password.required })
    @minLength({ value: 4, message: messages.t_password.minLenght })
    t_password: string;

    @required({ message: messages.t_birthday.required })
    t_birthday: Date;

    @prop()
    t_course: String;

    constructor() {
        this.t_name = null;
        this.t_surname = null;
        this.t_username = null;
        this.t_password = null;
        this.t_birthday = null;
        this.t_course = "";
    }
}
