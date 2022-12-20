
export interface EnvoieEmail {
  to: EnvoieEmail.Contact[];
  msg: EnvoieEmail.Message;
  headers: EnvoieEmail.Headers;
}

export namespace EnvoieEmail {
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
    subject: string;
    text: string;
  }
}
