import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import {
	ApiPoleEmploiOffreErrorManagementGet,
	ApiPoleEmploiOffreErrorManagementSearch, errorFromApiPoleEmploiGet, errorFromApiPoleEmploiSearch,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiErrorManagement.service';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const aLogInformationGet = aLogInformation({
	apiSource: 'API Pole Emploi',
	contexte: 'détail offre emploi', message: '[API Pole Emploi] impossible de récupérer une ressource',
});
const aLogInformationSearch = aLogInformation({
	apiSource: 'API Pole Emploi',
	contexte: 'recherche offre emploi', message: '[API Pole Emploi] impossible d‘effectuer une recherche',
});
describe('handleFailureError', () => {
	describe('apiPoleEmploiOffreErrorManagementSearch', () => {
		errorFromApiPoleEmploiSearch.forEach((messageErrorFromApiPoleEmploi) => {
			describe(`quand l’api renvoie une erreur 400 et le message d’erreur ${messageErrorFromApiPoleEmploi}`, () => {
				it('retourne une failure demande incorrecte', async () => {
					const apiPEerrorManagementServiceSearch = new ApiPoleEmploiOffreErrorManagementSearch(aLoggerService());
					const httpError = anHttpError(400, messageErrorFromApiPoleEmploi);

					const result = await apiPEerrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch) as Failure;

					expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
				});
				it('log les informations en warning', async () => {
					const loggerService = aLoggerService();
					const apiPEerrorManagementServiceSearch = new ApiPoleEmploiOffreErrorManagementSearch(loggerService);
					const httpError = anHttpError(400, messageErrorFromApiPoleEmploi);
					const expectedLogDetails = new SentryException(
						`${aLogInformationSearch.message} (erreur http)`,
						{ context: aLogInformationSearch.contexte, source: aLogInformationSearch.apiSource },
						{ errorDetail: httpError.response?.data },
					);

					await apiPEerrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch);

					expect(loggerService.warnWithExtra).toHaveBeenCalledWith(expectedLogDetails);
				});
			});
		});

		describe('quand l’api renvoie une erreur 400 et un message inconnue', () => {
			it('retourne une failure demande incorrecte', async () => {
				const httpError = anHttpError(400, 'message inconnu');

				const apiPEerrorManagementServiceSearch = new ApiPoleEmploiOffreErrorManagementSearch(aLoggerService());

				const result = await apiPEerrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch) as Failure;

				expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
			it('log les informations en erreur', async () => {
				const loggerService = aLoggerService();
				const apiPEerrorManagementServiceSearch = new ApiPoleEmploiOffreErrorManagementSearch(loggerService);
				const httpError = anHttpError(400, 'message inconnu');
				const expectedLogDetails = new SentryException(
					`${aLogInformationSearch.message} (erreur http)`,
					{ context: aLogInformationSearch.contexte, source: aLogInformationSearch.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				await apiPEerrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('quand l’api renvoie une erreur différente de 400', () => {
			it('retourne une failure demande incorrecte', async () => {
				const httpError = anHttpError(503, 'message inconnu');

				const apiPEerrorManagementServiceSearch = new ApiPoleEmploiOffreErrorManagementSearch(aLoggerService());

				const result = await apiPEerrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch) as Failure;

				expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
			it('log les informations en erreur', async () => {
				const loggerService = aLoggerService();
				const apiPEerrorManagementServiceSearch = new ApiPoleEmploiOffreErrorManagementSearch(loggerService);
				const httpError = anHttpError(400, 'message inconnu');
				const expectedLogDetails = new SentryException(
					`${aLogInformationSearch.message} (erreur http)`,
					{ context: aLogInformationSearch.contexte, source: aLogInformationSearch.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				await apiPEerrorManagementServiceSearch.handleFailureError(httpError, aLogInformationSearch);

				expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});

		describe('lorsque l‘erreur est une erreur interne', () => {
			it('doit créer une failure de service indisponible', () => {
				// GIVEN
				const loggerService = aLoggerService();
				const apiPEerrorManagementServiceSearch = new ApiPoleEmploiOffreErrorManagementSearch(loggerService);
				const internalError = new Error('ceci est une erreur interne');
				const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

				// WHEN
				const result = apiPEerrorManagementServiceSearch.handleFailureError(internalError, aLogInformationSearch);

				// THEN
				expect(result).toStrictEqual(expectedFailure);
			});
		});
	});
	describe('apiPoleEmploiOffreErrorManagementGet', () => {
		describe('quand l’api renvoie une erreur 400 et le message d’erreur est connu', () => {
			it('retourne une failure demande incorrecte', async () => {
				const apiPEerrorManagementServiceGet = new ApiPoleEmploiOffreErrorManagementGet(aLoggerService());
				const httpError = anHttpError(400, errorFromApiPoleEmploiGet);

				const result = await apiPEerrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet) as Failure;

				expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
			it('log les informations en warning', async () => {
				const loggerService = aLoggerService();
				const apiPEerrorManagementServiceGet = new ApiPoleEmploiOffreErrorManagementGet(loggerService);
				const httpError = anHttpError(400, errorFromApiPoleEmploiGet);
				const expectedLogDetails = new SentryException(
					`${aLogInformationGet.message} (erreur http)`,
					{ context: aLogInformationGet.contexte, source: aLogInformationGet.apiSource },
					{ errorDetail: httpError.response?.data },
				);

				await apiPEerrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet);

				expect(loggerService.warnWithExtra).toHaveBeenCalledWith(expectedLogDetails);
			});
		});
	});

	describe('quand l’api renvoie une erreur 400 et un message inconnue', () => {
		it('retourne une failure demande incorrecte', async () => {
			const httpError = anHttpError(400, 'message inconnu');

			const apiPEerrorManagementServiceGet = new ApiPoleEmploiOffreErrorManagementGet(aLoggerService());

			const result = await apiPEerrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet) as Failure;

			expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
		});
		it('log les informations en erreur', async () => {
			const loggerService = aLoggerService();
			const apiPEerrorManagementServiceGet = new ApiPoleEmploiOffreErrorManagementGet(loggerService);
			const httpError = anHttpError(400, 'message inconnu');
			const expectedLogDetails = new SentryException(
				`${aLogInformationGet.message} (erreur http)`,
				{ context: aLogInformationGet.contexte, source: aLogInformationGet.apiSource },
				{ errorDetail: httpError.response?.data },
			);

			await apiPEerrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet);

			expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
		});
	});

	describe('quand l’api renvoie une erreur différente de 400', () => {
		it('retourne une failure demande incorrecte', async () => {
			const httpError = anHttpError(503, 'message inconnu');

			const apiPEerrorManagementServiceGet = new ApiPoleEmploiOffreErrorManagementGet(aLoggerService());

			const result = await apiPEerrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet) as Failure;

			expect(result.errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
		});
		it('log les informations en erreur', async () => {
			const loggerService = aLoggerService();
			const apiPEerrorManagementServiceGet = new ApiPoleEmploiOffreErrorManagementGet(loggerService);
			const httpError = anHttpError(400, 'message inconnu');
			const expectedLogDetails = new SentryException(
				`${aLogInformationGet.message} (erreur http)`,
				{ context: aLogInformationGet.contexte, source: aLogInformationGet.apiSource },
				{ errorDetail: httpError.response?.data },
			);

			await apiPEerrorManagementServiceGet.handleFailureError(httpError, aLogInformationGet);

			expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
		});
	});

	describe('lorsque l‘erreur est une erreur interne', () => {
		it('doit créer une failure de service indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const apiPEerrorManagementServiceGet = new ApiPoleEmploiOffreErrorManagementGet(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = apiPEerrorManagementServiceGet.handleFailureError(internalError, aLogInformationGet);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});
})
;
