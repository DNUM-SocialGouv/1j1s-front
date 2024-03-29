import { createFailure, createSuccess, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aMail } from '~/server/mail/domain/mail.fixture';
import { aTipimailRequest, aTipimailRequestWithRedirection } from '~/server/mail/infra/repositories/tipimail.fixture';
import { TipimailRepository } from '~/server/mail/infra/repositories/tipimail.repository';
import { aLogInformation, anErrorManagementService } from '~/server/services/error/errorManagement.fixture';
import { Severity } from '~/server/services/error/errorManagement.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse, aPublicHttpClientService } from '~/server/services/http/publicHttpClient.service.fixture';

const logInformation = aLogInformation({
	apiSource: 'API Tipimail',
	contexte: 'Envoi email',
	message: 'impossible d‘envoyer un email',
	severity: Severity.FATAL,
});

describe('TipimailRepository', () => {
	describe('send', () => {
		describe('quand le mailer est actif', () => {
			describe('lorsque l’api retourne une 200', () => {
				it('envoie le mail', async () => {
					// given
					const httpClient = aPublicHttpClientService();
					jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(undefined));
					const errorManagementService = anErrorManagementService();
					const repository = new TipimailRepository(httpClient, errorManagementService, true);
					const expected = createSuccess(undefined);
					const tipimailRequest = aTipimailRequest();
					const mail = aMail();
					const context = ['accompagnement', 'mission_locale'];

					// when
					const result = await repository.send(mail, context);

					// then
					expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailRequest);
					expect(errorManagementService.handleFailureError).not.toHaveBeenCalled();
					expect(result).toEqual(expected);
				});
			});
			describe('lorsque l‘api retourne une erreur 400', () => {
				it('renvoie une erreur demande incorrecte', async () => {
					// given
					const errorHttp = anHttpError(400);
					const httpClient = aPublicHttpClientService({
						post: jest.fn(async () => {
							throw errorHttp;
						}),
					});
					const expectedFailure = ErreurMetier.DEMANDE_INCORRECTE;
					const errorManagementService = anErrorManagementService({
						handleFailureError: jest.fn(() => createFailure(expectedFailure)),
					});
					const repository = new TipimailRepository(httpClient, errorManagementService, true);
					const tipimailRequest = aTipimailRequest();
					const mail = aMail();
					const context = ['accompagnement', 'mission_locale'];

					// when
					const result = await repository.send(mail, context);

					// then
					expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailRequest);
					expect((result as Failure).errorType).toEqual(expectedFailure);
					expect(errorManagementService.handleFailureError).toHaveBeenCalledWith(errorHttp, logInformation);

				});
			});
		});

		describe('quand le mailer est inactif', () => {
			it('n‘envoie pas le mail', async () => {
				// given
				const httpClient = aPublicHttpClientService();
				jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(aTipimailRequest()));
				const debug = jest.spyOn(console, 'log').mockImplementation(() => undefined);
				const repository = new TipimailRepository(httpClient, anErrorManagementService(), false);
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
				const httpClient = aPublicHttpClientService();
				const redirectTo = 'redirect@email.com';
				jest.spyOn(httpClient, 'post').mockResolvedValue(anAxiosResponse(undefined));
				const errorManagementService = anErrorManagementService();
				const repository = new TipimailRepository(httpClient, errorManagementService, true, redirectTo);
				const expected = createSuccess(undefined);
				const tipimailRequest = aTipimailRequestWithRedirection();
				const mail = aMail();
				const context = ['accompagnement', 'mission_locale'];

				// when
				const result = await repository.send(mail, context);

				expect(httpClient.post).toHaveBeenCalledWith('messages/send', tipimailRequest);
				expect(errorManagementService.handleFailureError).not.toHaveBeenCalled();
				expect(result).toEqual(expected);
			});
		});
	});
});
