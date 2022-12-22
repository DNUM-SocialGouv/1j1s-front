import { unEnvoieEmail } from '~/client/services/envoieEmail/envoieEmail.fixture';
import { aEnvoieEmailList } from '~/server/envoie-email/domain/EnvoieEmail.fixture';
import { ApiEnvoieEmailRepository } from '~/server/envoie-email/infra/apiEnvoieEmail.repository';
import { createSuccess, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
  anAxiosError,
  anAxiosResponse,
  anHttpClientService,
} from '~/server/services/http/httpClientService.fixture';

describe('ApiEnvoieEmailRepository', () => {
  describe('send', () => {
    describe('lorsque l’envoie retourne une 200', () => {
      it('envoie le mail', async () => {
        // given
        const httpClient = anHttpClientService();
        jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(aEnvoieEmailList()));
        const repository = new ApiEnvoieEmailRepository(httpClient);
        const expected = createSuccess(aEnvoieEmailList());

        const envoieEmail = unEnvoieEmail();
        // when
        const result = await repository.send(envoieEmail);

        // then
        expect(httpClient.post).toHaveBeenCalledWith('/messages/send',envoieEmail);
        expect(result).toEqual(expected);
      });
    });

    describe('lorsque l‘api retourne une erreur 404', () => {
      it('renvoie une erreur demande incorrecte', async () => {
        // given
        const httpClient = anHttpClientService();
        jest.spyOn(httpClient, 'post').mockRejectedValue(anAxiosError({
          response: anAxiosResponse({}, 404),
        }));

        const repository = new ApiEnvoieEmailRepository(httpClient);
        const envoieEmail = unEnvoieEmail();

        // when
        const result = await repository.send(envoieEmail);
        
        // then
        expect((result as Failure).errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
      });
    });
    
    describe('lorsque l‘api retourne une erreur autre que 404', () => {
      it('renvoie une erreur service indisponible', async () => {
        // given
        const httpClient = anHttpClientService();
        jest.spyOn(httpClient, 'post').mockRejectedValue(anAxiosError({
          response: anAxiosResponse({}, 500),
        }));
        const repository = new ApiEnvoieEmailRepository(httpClient);
        const envoieEmail = unEnvoieEmail();
        
        // when
        const result = await repository.send(envoieEmail);
        
        // then
        expect((result as Failure).errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
      });
    });
  });
});
