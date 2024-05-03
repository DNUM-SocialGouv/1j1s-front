// NOTE (GAFI 03-05-2024): Mix of the HTML email regex (https://www.w3.org/TR/2012/WD-html-markup-20121025/input.email.html#form.data.emailaddress_xref2)
// 	and what is allowed by Strapi
const charactèresAcceptésPourEmailSansLePoint = 'a-zA-Z0-9!#$%&’*+\\/=?^_`\\{\\|\\}~\\-';
export const emailRegex = `^[${charactèresAcceptésPourEmailSansLePoint}]+(\\.[${charactèresAcceptésPourEmailSansLePoint}]+)*@[a-zA-Z0-9][a-zA-Z0-9\\-]+(?:\\.[a-zA-Z0-9\\-]+)+$`;
