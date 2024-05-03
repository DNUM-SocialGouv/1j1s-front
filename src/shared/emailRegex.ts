// NOTE (GAFI 03-05-2024): Mix of the HTML email regex (https://www.w3.org/TR/2012/WD-html-markup-20121025/input.email.html#form.data.emailaddress_xref2)
// 	and what is allowed by Strapi
const atext = 'a-zA-Z0-9!#$%&’*+\\/=?^_`\\{\\|\\}~\\-';
const localPart = `[${atext}]+(\\.[${atext}]+)*`;

const letter = 'a-zA-Z';
const letDig = `${letter}0-9`;
const ldhStr = `${letDig}-`;
const label = `[${letter}]+[${ldhStr}]*[${letDig}]*`;
const subdomain = `${label}(\\.${label})+`;
const domain = `${subdomain}`;

export const emailRegex = `^${localPart}@${domain}$`;
