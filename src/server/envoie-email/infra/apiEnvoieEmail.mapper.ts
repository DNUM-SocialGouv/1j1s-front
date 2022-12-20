import { EnvoieEmail } from '../domain/EnvoieEmail';

export function mapEnvoieEmail(envoieEmail: EnvoieEmail) {
  return {
    headers: mapHeaders(envoieEmail.headers),
    msg: mapMessage(envoieEmail.msg),
    to: mapContact(envoieEmail.to),
  };
}

function mapContact(contact: EnvoieEmail.Contact[]) {
  return contact.map((contacts) => ({
    address: contacts.address,
    personalName: contacts.personalName,
  }));
}

function mapMessage(messages: EnvoieEmail.Message) {
  return {
    from: messages.from,
    subject: messages.subject,
    text: messages.text,
  };
}

function mapHeaders(header: EnvoieEmail.Headers) {
  return {
    'X-TM-DOMAIN': header['X-TM-DOMAIN'],
    'X-TM-TAGS': header['X-TM-TAGS'],
  };
}
