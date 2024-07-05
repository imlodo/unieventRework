export const regex_form_control = {
	t_number_regex: /^[0-9]+$/,
	t_cap_regex: /^[0-9][0-9][0-9][1-9][0-9]$/,
	t_partita_iva_regex: /^[0-9]{11}$/,
	t_alphaNumeric_regex: /^[A-Za-z0-9]+$/,
	t_password_regex: /^\S*$/, 
	t_pec_regex: /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:\w*.?pec.(?:.?\w+)*)$/, 
	t_email_regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
	t_fiscal_code_regex: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i,
	t_date_regex: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g,
	t_date_format: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/,
};  

export const messages = {
    t_username: {
		required: "Core.form.errors.t_username.required",
		pattern: "Core.form.errors.t_username.pattern",
		email: "Core.form.errors.t_username.email"
	},
	t_password: {
		required: "Core.form.errors.t_password.required",
		pattern: "Core.form.errors.t_password.pattern",
		minLenght: "Core.form.errors.t_password.minLength"
	},
	t_name: {
		required: "Core.form.errors.t_name.required",
		minLenght: "Core.form.errors.t_name.minLength"
	},
	t_surname: {
		required: "Core.form.errors.t_surname.required",
		minLenght: "Core.form.errors.t_surname.minLength"
	},
	t_birthday: {
		required: "Core.form.errors.t_birthday.required",
	},
	t_type: {
		required: "Core.form.errors.t_type.required",
	},
};
