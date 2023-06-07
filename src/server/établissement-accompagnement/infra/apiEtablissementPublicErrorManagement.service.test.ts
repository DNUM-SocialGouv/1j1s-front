import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import {
	ApiEtablissementPublicErrorManagementService,
} from '~/server/établissement-accompagnement/infra/apiEtablissementPublicErrorManagement.service';
import { SentryException } from '~/server/exceptions/sentryException';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const logInformation = aLogInformation();

describe('apiEtablissementPublicErrorManagementService', () => {
	describe('quand l’api renvoie une erreur 404', () => {
		const httpError = anHttpError(404);
		it('retourne une failure demande incorrecte', () => {
			const apiEtablissementPublicErrorManagementService = new ApiEtablissementPublicErrorManagementService(aLoggerService());

			const result = apiEtablissementPublicErrorManagementService.handleFailureError(httpError, logInformation);

			expect(result.instance).toEqual('failure');
			expect((result as Failure).errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
		});
		it('log les informations en erreur', () => {
			const loggerService = aLoggerService();
			const apiEtablissementPublicErrorManagementService = new ApiEtablissementPublicErrorManagementService(loggerService);
			const httpError = anHttpError(404, 'message inconnu');
			const expectedLogDetails = new SentryException(
				`${logInformation.message} (erreur http)`,
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: httpError.response?.data },
			);

			apiEtablissementPublicErrorManagementService.handleFailureError(httpError, logInformation);

			expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
		});
	});

	describe('quand l’api renvoie une autre erreur', () => {
		it('retourne une failure demande incorrecte', () => {
			const httpError = anHttpError(400, 'message inconnu');

			const apiEtablissementPublicErrorManagementService = new ApiEtablissementPublicErrorManagementService(aLoggerService());

			const result = apiEtablissementPublicErrorManagementService.handleFailureError(httpError, logInformation) as Failure;

			expect(result.errorType).toEqual(ErreurMétier.SERVICE_INDISPONIBLE);
		});
		it('log les informations en erreur', () => {
			const loggerService = aLoggerService();
			const apiEtablissementPublicErrorManagementService = new ApiEtablissementPublicErrorManagementService(loggerService);
			const httpError = anHttpError(400, 'message inconnu');
			const expectedLogDetails = new SentryException(
				`${logInformation.message} (erreur http)`,
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: httpError.response?.data },
			);

			apiEtablissementPublicErrorManagementService.handleFailureError(httpError, logInformation);

			expect(loggerService.errorWithExtra).toHaveBeenCalledWith(expectedLogDetails);
		});
	});

	describe('lorsque l‘erreur est une erreur interne', () => {
		it('doit créer une failure de demande incorrecte', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const apiEtablissementPublicErrorManagementService = new ApiEtablissementPublicErrorManagementService(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = apiEtablissementPublicErrorManagementService.handleFailureError(internalError, logInformation);

			// THEN
			expect(result.instance).toEqual('failure');
			expect(result).toStrictEqual(expectedFailure);
		});
	});
});
