import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import {
	ApiFranceTravailOffreErrorManagementServiceGet,
	ApiFranceTravailOffreErrorManagementServiceSearch, 	errorFromApiFranceTravailGet,errorFromApiFranceTravailSearch } from '~/server/offres/infra/repositories/france-travail/apiFranceTravailErrorManagement.service';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const aLogInformationGet = aLogInformation({
	apiSource: 'API France Travail',
	contexte: 'détail offre emploi', message: 'impossible de récupérer le détail d‘une offre d’emploi',
});
const aLogInformationSearch = aLogInformation({
	apiSource: 'API France Travail',
	contexte: 'recherche offre emploi', message: 'impossible d‘effectuer une recherche d’offre d’emploi',
});
describe('handleFailureError', () => {
	describe('apiFranceTravailOffreErrorManagementSearch', () => {
		errorFromApiFranceTravailSearch.forEach((messageErrorFromApiFranceTravail) => {
			describe(`quand l’api renvoie une erreur 400 et le message d’erreur ${messageErrorFromApiFranceTravail}`, () => {
				it('retourne une failure demande incorrecte', () => {
					const apiFranceTravailOffreErrorManagementServiceSearch = new ApiFranceTravailOffreErrorManagementServiceSearch(aLoggerService());
					const httpError = anHttpError(400, messageErrorFromApiFranceTravail);

					const result = apiFranceTravailOffreErrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch) as Failure;

					expect(result.errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
				});
				it('log les informations en warning', () => {
					const loggerService = aLoggerService();
					const apiFranceTravailOffreErrorManagementServiceSearch = new ApiFranceTravailOffreErrorManagementServiceSearch(loggerService);
					const httpError = anHttpError(400, messageErrorFromApiFranceTravail);
					const expectedLogDetails = new SentryException(
						`[${aLogInformationSearch.apiSource}] ${aLogInformationSearch.message} (erreur http)`,
						{ context: aLogInformationSearch.contexte, source: aLogInformationSearch.apiSource },
						{ errorDetail: httpError.response?.data },
					);

					apiFranceTravailOffreErrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch);

					expect(loggerService.warnWithExtra).toHaveBeenCalledWith(expectedLogDetails);
				});
			});
		});

		describe('quand l’api renvoie une erreur 400 et un message inconnue', () => {
			it('retourne une failure demande incorrecte', () => {
				const httpError = anHttpError(400, 'message inconnu');

				const apiFranceTravailOffreErrorManagementServiceSearch = new ApiFranceTravailOffreErrorManagementServiceSearch(aLoggerService());

				const result = apiFranceTravailOffreErrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch) as Failure;

				expect(result.errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiFranceTravailOffreErrorManagementServiceSearch = new ApiFranceTravailOffreErrorManagementServiceSearch(loggerService);
				const httpError = anHttpError(400, 'message inconnu');
				const expectedLogDetails = new SentryException(
					`[${aLogInformationSearch.apiSource}] ${aLogInformationSearch.message} (erreur http)`,
					{ context: aLogInformationSearch.contexte, source: aLogInformationSearch.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiFranceTravailOffreErrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une erreur différente de 400', () => {
			it('retourne une failure demande incorrecte', () => {
				const httpError = anHttpError(503, 'message inconnu');

				const apiFranceTravailOffreErrorManagementServiceSearch = new ApiFranceTravailOffreErrorManagementServiceSearch(aLoggerService());

				const result = apiFranceTravailOffreErrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch) as Failure;

				expect(result.errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiFranceTravailOffreErrorManagementServiceSearch = new ApiFranceTravailOffreErrorManagementServiceSearch(loggerService);
				const httpError = anHttpError(400, 'message inconnu');
				const expectedLogDetails = new SentryException(
					`[${aLogInformationSearch.apiSource}] ${aLogInformationSearch.message} (erreur http)`,
					{ context: aLogInformationSearch.contexte, source: aLogInformationSearch.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiFranceTravailOffreErrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('lorsque l‘erreur est une erreur interne', () => {
			it('doit créer une failure de service indisponible', () => {
				// GIVEN
				const loggerService = aLoggerService();
				const apiFranceTravailOffreErrorManagementServiceSearch = new ApiFranceTravailOffreErrorManagementServiceSearch(loggerService);
				const internalError = new Error('ceci est une erreur interne');
				const expectedFailure = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);

				// WHEN
				const result = apiFranceTravailOffreErrorManagementServiceSearch.handleFailureError(internalError, aLogInformationSearch);

				// THEN
				expect(result).toStrictEqual(expectedFailure);
			});
		});
	});

	describe('apiFranceTravailOffreErrorManagementGet', () => {
		describe('isCustomError', () => {
			it('renvoie true lorsque la reponse est une axiosResponse de status 204', () => {
				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(aLoggerService());
				const axiosResponse = anAxiosResponse({}, 204);

				const result = apiFranceTravailOffreErrorManagementServiceGet.isError(axiosResponse);
				expect(result).toBe(true);
			});
			it('renvoie false lorsque la reponse n‘est pas de 204', () => {
				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(aLoggerService());
				const axiosResponse = anAxiosResponse({}, 200);

				const result = apiFranceTravailOffreErrorManagementServiceGet.isError(axiosResponse);
				expect(result).toBe(false);
			});
		});

		describe('quand l‘api renvoie une reponse avec un status 204', () => {
			it('retourne une failure de contenu indisponible', () => {
				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(aLoggerService());
				const axiosResponse = anAxiosResponse({}, 204);

				const result = apiFranceTravailOffreErrorManagementServiceGet.handleFailureError(axiosResponse, aLogInformationGet);

				expect(result.errorType).toEqual(ErreurMetier.CONTENU_INDISPONIBLE);
			});
		});

		describe('quand l’api renvoie une erreur 400 et le message d’erreur est connu', () => {
			it('retourne une failure demande incorrecte', () => {
				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(aLoggerService());
				const httpError = anHttpError(400, errorFromApiFranceTravailGet);

				const result = apiFranceTravailOffreErrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet) as Failure;

				expect(result.errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
			it('log les informations en warning', () => {
				const loggerService = aLoggerService();
				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(loggerService);
				const httpError = anHttpError(400, errorFromApiFranceTravailGet);
				const expectedLogDetails = new SentryException(
					`[${aLogInformationGet.apiSource}] ${aLogInformationGet.message} (erreur http)`,
					{ context: aLogInformationGet.contexte, source: aLogInformationGet.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiFranceTravailOffreErrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet);

				expect(loggerService.warnWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une erreur 400 et un message inconnue', () => {
			it('retourne une failure demande incorrecte', () => {
				const httpError = anHttpError(400, 'message inconnu');

				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(aLoggerService());

				const result = apiFranceTravailOffreErrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet) as Failure;

				expect(result.errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(loggerService);
				const httpError = anHttpError(400, 'message inconnu');
				const expectedLogDetails = new SentryException(
					`[${aLogInformationGet.apiSource}] ${aLogInformationGet.message} (erreur http)`,
					{ context: aLogInformationGet.contexte, source: aLogInformationGet.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiFranceTravailOffreErrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une erreur différente de 400', () => {
			it('retourne une failure demande incorrecte', () => {
				const httpError = anHttpError(503, 'message inconnu');

				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(aLoggerService());

				const result = apiFranceTravailOffreErrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet) as Failure;

				expect(result.errorType).toEqual(ErreurMetier.DEMANDE_INCORRECTE);
			});
			it('log les informations en erreur', () => {
				const loggerService = aLoggerService();
				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(loggerService);
				const httpError = anHttpError(400, 'message inconnu');
				const expectedLogDetails = new SentryException(
					`[${aLogInformationGet.apiSource}] ${aLogInformationGet.message} (erreur http)`,
					{ context: aLogInformationGet.contexte, source: aLogInformationGet.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				apiFranceTravailOffreErrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('lorsque l‘erreur est une erreur interne', () => {
			it('doit créer une failure de service indisponible', () => {
				// GIVEN
				const loggerService = aLoggerService();
				const apiFranceTravailOffreErrorManagementServiceGet = new ApiFranceTravailOffreErrorManagementServiceGet(loggerService);
				const internalError = new Error('ceci est une erreur interne');
				const expectedFailure = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);

				// WHEN
				const result = apiFranceTravailOffreErrorManagementServiceGet.handleFailureError(internalError, aLogInformationGet);

				// THEN
				expect(result).toStrictEqual(expectedFailure);
			});
		});
	});
})
;
