import { aMail, aMailWithRedirection } from '~/server/mail/domain/mail.fixture';
import { replaceToAddress } from '~/server/mail/infra/repositories/mail.mapper';

describe('mailMapper', () => {
  describe('quand aucune redirection n‘est demandée', () => {
    it('retourne le mail d‘origine', () => {
      const mail = aMail();

      const result = replaceToAddress(mail);

      expect(result).toEqual(mail);
    });
  });

  describe('quand une redirection est demandée', () => {
    it('remplace tous les destinataires par la redirection', () => {
      const mail = aMail();
      const redirectTo = 'redirect@email.com';
      const mailWithRedirection = aMailWithRedirection();

      const result = replaceToAddress(mail, redirectTo);

      expect(result).toEqual(mailWithRedirection);
    });
  });
});
