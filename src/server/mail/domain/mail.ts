export interface Mail {
  to: Mail.Contact[];
  msg: Mail.Message;
  headers: Mail.Headers;
}

export namespace Mail {
  export type Headers = {
    'X-TM-DOMAIN': string;
    'X-TM-TAGS': string[];
  }

  export interface Contact {
    address: string;
    personalName: string;
  }

  export interface Message {
    from: Contact;
    replyTo: Contact;
    subject: string;
    text: string;
  }
}
