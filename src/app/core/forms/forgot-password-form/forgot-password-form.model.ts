import { email, required } from "@rxweb/reactive-form-validators";
import { messages } from "../../utility/form-constant";

export class ForgotPasswordFormDataModel {

    @required({ message: messages.t_username.required })
    @email({message:messages.t_username.email})
    t_username: string;

    constructor() {
        this.t_username = null;
    }
}
