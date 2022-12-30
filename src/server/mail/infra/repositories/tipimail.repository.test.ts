import * as Sentry from '@sentry/nextjs';

import { createSuccess, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { aMail } from '~/server/mail/domain/mail.fixture';
import { aTipimailRequest, aTipimailRequestWithRedirection } from '~/server/mail/infra/repositories/tipimail.fixture';
import {
  TipimailRepository,
} from '~/server/mail/infra/repositories/tipimail.repository';
import { anAxiosError, anAxiosResponse, anHttpClientService } from '~/server/services/http/httpClientService.fixture';

jest.mock('@sentry/nextjs');

const SentryMock = jest.mocked(Sentry);

describe('TipimailRepository', () => {
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
          const repository = new TipimailRepository(httpClient, true);
          const expected = createSuccess(undefined);
          const tipimailRequest = aTipimailRequest();
          const mail = aMail();
          const context = ['accompagnement', 'mission_locale'];

          // when
          const result = await repository.send(mail, context);

          // then
          expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailRequest);
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

          const repository = new TipimailRepository(httpClient, true);
          const tipimailRequest = aTipimailRequest();
          const mail = aMail();
          const context = ['accompagnement', 'mission_locale'];

          // when
          const result = await repository.send(mail, context);

          // then
          expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailRequest);
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

          const repository = new TipimailRepository(httpClient, true);
          const tipimailRequest = aTipimailRequest();
          const mail = aMail();
          const context = ['accompagnement', 'mission_locale'];

          // when
          const result = await repository.send(mail, context);

          // then
          expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailRequest);
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
          const repository = new TipimailRepository(httpClient, true);
          const tipimailRequest = aTipimailRequest();
          const mail = aMail();
          const context = ['accompagnement', 'mission_locale'];

          // when
          const result = await repository.send(mail, context);

          // then
          expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailRequest);
          expect((result as Failure).errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
        });
      });
    });

    describe('quand le mailer est inactif', () => {
      it('n‘envoie pas le mail', async () => {
        // given
        const httpClient = anHttpClientService();
        jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(aTipimailRequest()));
        const debug = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        const repository = new TipimailRepository(httpClient, false);
        const expected = createSuccess(undefined);
        const tipimailRequest = aTipimailRequest();
        const mail = aMail();
        const context = ['accompagnement', 'mission_locale'];

        // when
        const result = await repository.send(mail, context);

        // then
        expect(httpClient.post).not.toHaveBeenCalled();
        expect(debug).toHaveBeenCalledWith('Mailer désactivé, email non envoyé', JSON.stringify(tipimailRequest));
        expect(result).toEqual(expected);
      });
    });

    describe('quand le mail doit être redirigé vers une autre adresse', () => {
      it('change le destinataire avec cette adresse', async () => {
        const httpClient = anHttpClientService();
        const redirectTo = 'redirect@email.com';
        jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(undefined));
        const repository = new TipimailRepository(httpClient, true, redirectTo);
        const expected = createSuccess(undefined);
        const tipimailRequest = aTipimailRequestWithRedirection();
        const mail = aMail();
        const context = ['accompagnement', 'mission_locale'];

        // when
        const result = await repository.send(mail, context);

        expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailRequest);
        expect(SentryMock.captureMessage).not.toHaveBeenCalled();
        expect(result).toEqual(expected);
      });
    });
  });
});
