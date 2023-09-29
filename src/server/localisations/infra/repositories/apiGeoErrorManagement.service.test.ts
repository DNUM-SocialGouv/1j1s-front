import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { ApiGeoErrorManagementService } from '~/server/localisations/infra/repositories/apiGeoErrorManagement.service';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const aLogInformationApiGeo = aLogInformation({
	apiSource: 'API Geo',
	contexte: 'get endpoint', message: 'impossible de récupérer une commune par son code postal',
});

const error400IdIncorrect = 'Le format de l\'id de la localisation recherchée est incorrect.';
describe('apiGeoErrorManagementService', () => {
	describe('quand l‘api nous renvoie une erreur http', () => {
		it('retourne une failure', () => {
			const httpError = anHttpError(503);

			const apiGeoErrorManagementService = new ApiGeoErrorManagementService(aLoggerService());

			const result = apiGeoErrorManagementService.handleFailureError(httpError, aLogInformationApiGeo);

			expect(result.instance).toEqual('failure');
		});

		describe('quand le status est 400 et que le message d’erreur est celui attendu', () => {
			it('log les informations en warning', () => {
				const loggerService = aLoggerService();
				const apiGeoErrorManagementService = new ApiGeoErrorManagementService(loggerService);
				const httpError = anHttpError(400, error400IdIncorrect);
				const expectedLogDetails = new SentryException(
					`[${aLogInformationApiGeo.apiSource}] ${aLogInformationApiGeo.message} (erreur http)`,
					{ context: aLogInformationApiGeo.contexte, source: aLogInformationApiGeo.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiGeoErrorManagementService.handleFailureError(httpError, aLogInformationApiGeo);

				expect(loggerService.warnWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une erreur 400 et un message inconnue', () => {
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiGeoErrorManagementService = new ApiGeoErrorManagementService(loggerService);
				const httpError = anHttpError(400, 'message inconnu');
				const expectedLogDetails = new SentryException(
					`[${aLogInformationApiGeo.apiSource}] ${aLogInformationApiGeo.message} (erreur http)`,
					{ context: aLogInformationApiGeo.contexte, source: aLogInformationApiGeo.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiGeoErrorManagementService.handleFailureError(httpError, aLogInformationApiGeo);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une erreur 504', () => {
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiGeoErrorManagementService = new ApiGeoErrorManagementService(loggerService);
				const httpError = anHttpError(504);
				const expectedLogDetails = new SentryException(
					`[${aLogInformationApiGeo.apiSource}] ${aLogInformationApiGeo.message} (erreur http)`,
					{ context: aLogInformationApiGeo.contexte, source: aLogInformationApiGeo.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiGeoErrorManagementService.handleFailureError(httpError, aLogInformationApiGeo);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une autre erreur', () => {
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiGeoErrorManagementService = new ApiGeoErrorManagementService(loggerService);
				const httpError = anHttpError(504);
				const expectedLogDetails = new SentryException(
					`[${aLogInformationApiGeo.apiSource}] ${aLogInformationApiGeo.message} (erreur http)`,
					{ context: aLogInformationApiGeo.contexte, source: aLogInformationApiGeo.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiGeoErrorManagementService.handleFailureError(httpError, aLogInformationApiGeo);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});
	});

	describe('lorsque l‘erreur est une erreur interne', () => {
		it('log les informations en erreur', () => {
			const loggerService = aLoggerService();
			const apiPEerrorManagementServiceGet = new ApiGeoErrorManagementService(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			apiPEerrorManagementServiceGet.handleFailureError(internalError, aLogInformationApiGeo);

			expect(loggerService.errorWithExtra).toHaveBeenCalledTimes(1);
		});
		it('doit créer une failure de service indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const apiGeoErrorManagementService = new ApiGeoErrorManagementService(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			const expectedFailure = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = apiGeoErrorManagementService.handleFailureError(internalError, aLogInformationApiGeo);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});
});

