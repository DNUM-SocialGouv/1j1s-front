import { unEnvoieEmail } from '~/client/services/envoieEmail/envoieEmail.fixture';
import {
  DemandeDeContactAccompagnement,
} from '~/server/demande-de-contact/domain/DemandeDeContact';
import {
  TipimailDemandeDeContactRepository,
} from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.repository';
import { aEnvoieEmailList } from '~/server/envoie-email/domain/DemandeDeContactTipimail.fixture';
import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
  anAxiosError,
  anAxiosResponse,
  anHttpClientService,
} from '~/server/services/http/httpClientService.fixture';

describe('DemandeDeContactMailRepository', () => {

  describe('envoyer', () => {
    const demandeDeContactMail: DemandeDeContactAccompagnement = {
      age: 18,
      codePostal: '75001',
      commentaire: 'Un nouveau commentaire',
      email: 'test@test.com',
      nom: 'Test',
      prénom: 'TEST',
      téléphone: '0123456789',
      ville: 'Paris',
    };

    it('fait un POST', async () => {
      // Given
      const spy = anHttpClientService();
      const repository = new TipimailDemandeDeContactRepository(spy);
      const expectedBody = {
        data: {
          age: 18,
          code_postal: '75001',
          commentaire: 'Un nouveau commentaire',
          email: 'test@test.com',
          nom: 'Test',
          prenom: 'TEST',
          telephone: '0123456789',
          ville: 'Paris',
        },
      };
      // When
      await repository.envoyer(demandeDeContactMail);
      // Then
      expect(spy.post).toHaveBeenCalledWith('/messages/send', expectedBody);
    });
    it('résout un Success', async () => {
      // Given
      const spy = anHttpClientService();
      const repository = new TipimailDemandeDeContactRepository(spy);
      // When
      const result = await repository.envoyer(demandeDeContactMail);
      // Then
      expect(result).toEqual(createSuccess(demandeDeContactMail));
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résout une Failure', async () => {
        // Given
        const spy = anHttpClientService();
        jest.spyOn(spy, 'post').mockRejectedValue(new Error('Erreur non gérée'));
        const repository = new TipimailDemandeDeContactRepository(spy);
        // When
        const result = await repository.envoyer(demandeDeContactMail);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });

  describe('send', () => {
    describe('lorsque l’envoie retourne une 200', () => {
      it('envoie le mail', async () => {
        // given
        const httpClient = anHttpClientService();
        jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(aEnvoieEmailList()));
        const repository = new TipimailDemandeDeContactRepository(httpClient);
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

        const repository = new TipimailDemandeDeContactRepository(httpClient);
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
        const repository = new TipimailDemandeDeContactRepository(httpClient);
        const envoieEmail = unEnvoieEmail();

        // when
        const result = await repository.send(envoieEmail);

        // then
        expect((result as Failure).errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
      });
    });
  });
});
