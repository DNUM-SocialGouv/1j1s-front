import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import {
	ApiAdresseErrorManagementService,
} from '~/server/localisations/infra/repositories/apiAdresseErrorManagement.service';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const aLogInformationApiAdresse = aLogInformation({
	apiSource: 'API Adresse',
	contexte: 'get commune', message: '[API Adresse] impossible de récupérer une ressource',
});

const error400IdIncorrect = 'Le format de l’id de l’adresse recherchée est incorrect.';
describe('apiAdresseErrorManagementService', () => {
	describe('quand l‘api nous renvoie une erreur http', () => {
		it('retourne une failure', () => {
			const httpError = anHttpError(503);

			const apiAdresseErrorManagementService = new ApiAdresseErrorManagementService(aLoggerService());

			const result = apiAdresseErrorManagementService.handleFailureError(httpError, aLogInformationApiAdresse);

			expect(result.instance).toEqual('failure');
		});

		describe('quand le status est 400 et que le message d’erreur est celui attendu', () => {
			it('log les informations en warning', () => {
				const loggerService = aLoggerService();
				const apiAdresseErrorManagementService = new ApiAdresseErrorManagementService(loggerService);
				const httpError = anHttpError(400, error400IdIncorrect);
				const expectedLogDetails = new SentryException(
					`${aLogInformationApiAdresse.message} (erreur http)`,
					{ context: aLogInformationApiAdresse.contexte, source: aLogInformationApiAdresse.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiAdresseErrorManagementService.handleFailureError(httpError, aLogInformationApiAdresse);

				expect(loggerService.warnWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une erreur 400 et un message inconnue', () => {
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiAdresseErrorManagementService = new ApiAdresseErrorManagementService(loggerService);
				const httpError = anHttpError(400, 'message inconnu');
				const expectedLogDetails = new SentryException(
					`${aLogInformationApiAdresse.message} (erreur http)`,
					{ context: aLogInformationApiAdresse.contexte, source: aLogInformationApiAdresse.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiAdresseErrorManagementService.handleFailureError(httpError, aLogInformationApiAdresse);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une erreur 504', () => {
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiAdresseErrorManagementService = new ApiAdresseErrorManagementService(loggerService);
				const httpError = anHttpError(504);
				const expectedLogDetails = new SentryException(
					`${aLogInformationApiAdresse.message} (erreur http)`,
					{ context: aLogInformationApiAdresse.contexte, source: aLogInformationApiAdresse.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiAdresseErrorManagementService.handleFailureError(httpError, aLogInformationApiAdresse);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une autre erreur', () => {
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiAdresseErrorManagementService = new ApiAdresseErrorManagementService(loggerService);
				const httpError = anHttpError(504);
				const expectedLogDetails = new SentryException(
					`${aLogInformationApiAdresse.message} (erreur http)`,
					{ context: aLogInformationApiAdresse.contexte, source: aLogInformationApiAdresse.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiAdresseErrorManagementService.handleFailureError(httpError, aLogInformationApiAdresse);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});
	});

	describe('lorsque l‘erreur est une erreur interne', () => {
		it('log les informations en erreur', () => {
			const loggerService = aLoggerService();
			const apiPEerrorManagementServiceGet = new ApiAdresseErrorManagementService(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			apiPEerrorManagementServiceGet.handleFailureError(internalError, aLogInformationApiAdresse);

			expect(loggerService.errorWithExtra).toHaveBeenCalledTimes(1);
		});
		it('doit créer une failure de service indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const apiAdresseErrorManagementService = new ApiAdresseErrorManagementService(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = apiAdresseErrorManagementService.handleFailureError(internalError, aLogInformationApiAdresse);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});
});

