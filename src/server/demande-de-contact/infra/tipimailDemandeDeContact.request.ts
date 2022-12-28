export interface TipimailDemandeDeContactRequest {
  to: TipimailDemandeDeContactRequest.Contact[];
  msg: TipimailDemandeDeContactRequest.Message;
  headers: TipimailDemandeDeContactRequest.Headers;
}

export namespace TipimailDemandeDeContactRequest {
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
