import {
	ApiLaBonneAlternanceErrorManagementServiceGet,
	ApiLaBonneAlternanceErrorManagementServiceSearch,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternanceErrorManagement.service';
import { SentryException } from '~/server/exceptions/sentryException';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const logInformation = aLogInformation({
	apiSource: 'API LaBonneAlternance',
	contexte: 'contexte la bonne alternance recherche alternance',
	message: 'impossible d’effectuer la demande',
});

describe('apiLaBonneAlternanceErrorManagementServiceSearch', () => {
	describe('lorsque l‘erreur est une erreur http', () => {
		it('lorsque l‘erreur est une erreur 429, log les informations avec une explication supplémentaire', () => {
			// GIVEN
			const errorCode = 429;
			const loggerService = aLoggerService();
			const apiLaBonneAlternanceErrorManagementServiceSearch = new ApiLaBonneAlternanceErrorManagementServiceSearch(loggerService);
			const httpError = anHttpError(errorCode);


			// WHEN
			apiLaBonneAlternanceErrorManagementServiceSearch.handleFailureError(httpError, logInformation);

			// THEN
			expect(loggerService.errorWithExtra).toHaveBeenCalledTimes(1);
			expect(loggerService.errorWithExtra).toHaveBeenCalledWith(new SentryException(
				'[API LaBonneAlternance] impossible d’effectuer la demande - trop de requêtes (erreur http)',
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: httpError.response?.data },
			));
		});
	});
});
describe('apiLaBonneAlternanceErrorManagementServiceGet', () => {
	describe('lorsque l‘erreur est une erreur http', () => {
		it('lorsque l‘erreur est une erreur 404 log les informations avec une explication supplémentaire', () => {
			// GIVEN
			const errorCode = 404;
			const loggerService = aLoggerService();
			const apiLaBonneAlternanceErrorManagementServiceGet = new ApiLaBonneAlternanceErrorManagementServiceGet(loggerService);
			const httpError = anHttpError(errorCode);


			// WHEN
			apiLaBonneAlternanceErrorManagementServiceGet.handleFailureError(httpError, logInformation);

			// THEN
			expect(loggerService.warnWithExtra).toHaveBeenCalledTimes(1);
			expect(loggerService.warnWithExtra).toHaveBeenCalledWith(new SentryException(
				'[API LaBonneAlternance] impossible d’effectuer la demande - annonce non trouvé/expiré (erreur http)',
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: httpError.response?.data },
			));
		});
	});
});
