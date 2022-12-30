import { Mail } from '~/server/mail/domain/mail';

export function replaceToAddress(mail: Mail, redirectTo?: string): Mail {
  if (!redirectTo) {
    return mail;
  }

  return {
    ...mail,
    to: mail.to.map((to: Mail.Contact) => ({
      ...to,
      address: redirectTo,
    })),
  };
}
