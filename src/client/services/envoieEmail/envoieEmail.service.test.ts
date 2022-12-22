import { unEnvoieEmail } from '~/client/services/envoieEmail/envoieEmail.fixture';
import { EnvoieEmailService } from '~/client/services/envoieEmail/envoieEmail.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { aEnvoieEmailList } from '~/server/envoie-email/domain/EnvoieEmail.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { anAxiosResponse } from '~/server/services/http/httpClientService.fixture';

describe('EnvoieEmailService', () => {
  describe('l’envoie du mail c’est bien passé', () => {
    it('renvoie un success', async () => {
      const httpClient = anHttpClientService();
      jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(aEnvoieEmailList()));
      const envoieEmailService = new EnvoieEmailService(httpClient);

      const envoieEmail = unEnvoieEmail();
      const actual = await envoieEmailService.envoyer(envoieEmail);

      expect(actual).toEqual(createSuccess(aEnvoieEmailList()));
    });
  });

  describe('l’envoie du mail tombe en erreur', () => {
    it('revoie une Failure', async () => {
      const httpClientService = anHttpClientService();
      jest.spyOn(httpClientService, 'post').mockRejectedValue(new Error('Error'));
      const envoieEmailService = new EnvoieEmailService(httpClientService);

      const envoieEmail = unEnvoieEmail();
      const result = await envoieEmailService.envoyer(envoieEmail);
      expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
    });
  });
});
