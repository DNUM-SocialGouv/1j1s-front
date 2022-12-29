import * as Sentry from '@sentry/nextjs';

import { aDemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact.fixture';
import {
  aTipimailDemandeDeContactRequest,
  aTipimailDemandeDeContactWithRedirectionRequest,
} from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.fixture';
import {
  TipimailDemandeDeContactRepository,
} from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.repository';
import { createSuccess, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { anAxiosError, anAxiosResponse, anHttpClientService } from '~/server/services/http/httpClientService.fixture';

jest.mock('@sentry/nextjs');

const SentryMock = jest.mocked(Sentry);

describe('DemandeDeContactMailRepository', () => {
  afterEach(() => {
    SentryMock.captureMessage.mockReset();
  });

  describe('send', () => {
    describe('quand le mailer est actif', () => {
      describe('lorsque l’api retourne une 200', () => {
        it('envoie le mail', async () => {
          // given
          const httpClient = anHttpClientService();
          jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(undefined));
          const repository = new TipimailDemandeDeContactRepository(httpClient, true);
          const expected = createSuccess(undefined);
          const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
          const tipimailDemandeDeContactRequest = aTipimailDemandeDeContactRequest();

          // when
          const result = await repository.send(demandeDeContactAccompagnement);

          // then
          expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailDemandeDeContactRequest);
          expect(SentryMock.captureMessage).not.toHaveBeenCalled();
          expect(result).toEqual(expected);
        });
      });

      describe('lorsque l‘api retourne une erreur 400', () => {
        it('renvoie une erreur demande incorrecte', async () => {
          // given
          const httpClient = anHttpClientService();
          jest.spyOn(httpClient, 'post').mockRejectedValue(anAxiosError({
            response: anAxiosResponse({}, 400),
          }));

          const repository = new TipimailDemandeDeContactRepository(httpClient, true);
          const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
          const tipimailDemandeDeContactRequest = aTipimailDemandeDeContactRequest();

          // when
          const result = await repository.send(demandeDeContactAccompagnement);

          // then
          expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailDemandeDeContactRequest);
          expect((result as Failure).errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
        });
      });

      describe('lorsque l‘api retourne une erreur 401', () => {
        it('renvoie une erreur service indisponible', async () => {
          // given
          const httpClient = anHttpClientService();
          jest.spyOn(httpClient, 'post').mockRejectedValue(anAxiosError({
            response: anAxiosResponse({}, 401),
          }));

          const repository = new TipimailDemandeDeContactRepository(httpClient, true);
          const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
          const tipimailDemandeDeContactRequest = aTipimailDemandeDeContactRequest();

          // when
          const result = await repository.send(demandeDeContactAccompagnement);

          // then
          expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailDemandeDeContactRequest);
          expect((result as Failure).errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
        });
      });

      describe('lorsque l‘api retourne une erreur autre que 400 et 401', () => {
        it('renvoie une erreur service indisponible', async () => {
          // given
          const httpClient = anHttpClientService();
          jest.spyOn(httpClient, 'post').mockRejectedValue(anAxiosError({
            response: anAxiosResponse({}, 500),
          }));
          const repository = new TipimailDemandeDeContactRepository(httpClient, true);
          const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
          const tipimailDemandeDeContactRequest = aTipimailDemandeDeContactRequest();

          // when
          const result = await repository.send(demandeDeContactAccompagnement);

          // then
          expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailDemandeDeContactRequest);
          expect((result as Failure).errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
        });
      });
    });

    describe('quand le mailer est inactif', () => {
      it('n‘envoie pas le mail', async () => {
        // given
        const httpClient = anHttpClientService();
        jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(aTipimailDemandeDeContactRequest()));
        const debug = jest.spyOn(console, 'debug').mockImplementation(() => undefined);
        const repository = new TipimailDemandeDeContactRepository(httpClient, false);
        const expected = createSuccess(undefined);
        const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();

        // when
        const result = await repository.send(demandeDeContactAccompagnement);

        // then
        expect(httpClient.post).not.toHaveBeenCalled();
        expect(debug).toHaveBeenCalledWith('Mailer désactivé, email non envoyé', "{\"headers\":{\"X-TM-DOMAIN\":\"1jeune1solution.gouv.fr\",\"X-TM-TAGS\":[\"accompagnement\",\"mission_locale\"]},\"msg\":{\"from\":{\"address\":\"contact-1j1s@sg.social.gouv.fr\",\"personalName\":\"1jeune1solution\"},\"replyTo\":{\"address\":\"john.doe@email.com\",\"personalName\":\"John Doe\"},\"subject\":\"Demande de contact 1jeune1solution\",\"text\":\"Cette demande de contact a été renseignée depuis le site 1jeune1solution https://www.1jeune1solution.gouv.fr/accompagnement :\\n    • Prénom : John \\n    • Nom : Doe \\n    • Adresse email : john.doe@email.com\\n    • Téléphone : 0606060606\\n    • Age : 23\\n    • Ville : Paris (75056) \\n    • Commentaire : Merci de me recontacter\"},\"to\":[{\"address\":\"email@email.com\",\"personalName\":\"Mission locale pour l'insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 5e 12e et 13e arrondissements\"}]}");
        expect(result).toEqual(expected);
      });
    });

    describe('quand le mail doit être redirigé vers une autre adresse', () => {
      it('change le destinataire avec cette adresse', async () => {
        const httpClient = anHttpClientService();
        const redirectTo = 'redirect@email.com';
        jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(undefined));
        const repository = new TipimailDemandeDeContactRepository(httpClient, true, redirectTo);
        const expected = createSuccess(undefined);
        const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
        const tipimailDemandeDeContactRequest = aTipimailDemandeDeContactWithRedirectionRequest();

        const result = await repository.send(demandeDeContactAccompagnement);

        expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailDemandeDeContactRequest);
        expect(SentryMock.captureMessage).not.toHaveBeenCalled();
        expect(result).toEqual(expected);
      });
    });
  });
});
