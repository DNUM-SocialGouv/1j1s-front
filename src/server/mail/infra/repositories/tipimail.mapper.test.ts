import { aMail } from '~/server/mail/domain/mail.fixture';
import { aTipimailRequest, aTipimailRequestWithRedirection } from '~/server/mail/infra/repositories/tipimail.fixture';
import { mapTipimailRequest } from '~/server/mail/infra/repositories/tipimail.mapper';

describe('TipimailMapper', () => {
  describe('quand aucune redirection n‘est demandée', () => {
    it('retourne le mail d‘origine', () => {
      const tipimailRequest = aTipimailRequest();
      const mail = aMail();
      const context = ['accompagnement', 'mission_locale'];

      const result = mapTipimailRequest(mail, context);

      expect(result).toEqual(tipimailRequest);
    });
  });

  describe('quand une redirection est demandée', () => {
    it('remplace tous les destinataires par la redirection', () => {
      const redirectTo = 'redirect@email.com';
      const mail = aMail();
      const context = ['accompagnement', 'mission_locale'];
      const mailWithRedirection = aTipimailRequestWithRedirection();

      const result = mapTipimailRequest(mail, context, redirectTo);

      expect(result).toEqual(mailWithRedirection);
    });
  });
});
