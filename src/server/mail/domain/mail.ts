export interface Mail {
  to: MailContact[];
  msg: MailMessage;
}

export interface MailContact {
  address: string;
  personalName: string;
}

export interface MailMessage {
  from: MailContact;
  replyTo?: MailContact;
  subject: string;
  text: string;
}
