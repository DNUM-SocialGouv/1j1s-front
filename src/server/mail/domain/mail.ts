export interface Mail {
  to: Mail.Contact[];
  msg: Mail.Message;
}

export namespace Mail {
  export interface Contact {
    address: string;
    personalName: string;
  }

  export interface Message {
    from: Contact;
    replyTo?: Contact;
    subject: string;
    text: string;
  }
}
