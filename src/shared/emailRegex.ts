// NOTE (DORO - 02/11/23) : Regex from HTML input type=email (https://www.w3.org/TR/2012/WD-html-markup-20121025/input.email.html#form.data.emailaddress_xref2)
const charactèresAcceptésPourEmail = '[a-zA-Z0-9.!#$%&’*+\\/=?^_`\\{\\|\\}~\\-]';
const charactèresAcceptésPourEmailSansLePoint = '[a-zA-Z0-9!#$%&’*+\\/=?^_`\\{\\|\\}~\\-]';
export const emailRegex = `^[^\\.](?!.*\\.{2})${charactèresAcceptésPourEmail}+${charactèresAcceptésPourEmailSansLePoint}@[a-zA-Z0-9][a-zA-Z0-9\\-]+(?:\\.[a-zA-Z0-9\\-]+)+$`;
