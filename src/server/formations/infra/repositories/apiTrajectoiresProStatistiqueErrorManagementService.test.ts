import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import {
	ApiTrajectoiresProStatistiqueErrorManagementService,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistiqueErrorManagementService';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

describe('ApiTrajectoiresProStatistiqueErrorManagementService', () => {
	describe('quand il y a une erreur http', () => {
		it('qui est une 404, log en warning les informations de l’erreur et retourne une erreur métier CONTENU_INDISPONIBLE', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const apiTrajectoiresProStatistiqueErrorManagementService = new ApiTrajectoiresProStatistiqueErrorManagementService(loggerService);
			const httpNotFoundError = anHttpError(404);
			const logInformation = aLogInformation();

			// WHEN
			const failure = apiTrajectoiresProStatistiqueErrorManagementService.handleFailureError(httpNotFoundError, logInformation);

			// THEN
			expect(loggerService.warnWithExtra).toHaveBeenCalledWith(new SentryException(
				`${logInformation.message} (erreur http)`,
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: httpNotFoundError.response?.data },
			));
			expect(failure.errorType).toStrictEqual(ErreurMétier.CONTENU_INDISPONIBLE);
		});

		it('qui est autre que 404, log en erreur les informations de l’erreur et retourne une erreur métier associée', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const apiTrajectoiresProStatistiqueErrorManagementService = new ApiTrajectoiresProStatistiqueErrorManagementService(loggerService);
			const httpNotFoundError = anHttpError(400);
			const logInformation = aLogInformation();

			// WHEN
			const failure = apiTrajectoiresProStatistiqueErrorManagementService.handleFailureError(httpNotFoundError, logInformation);

			// THEN
			expect(loggerService.errorWithExtra).toHaveBeenCalledWith(new SentryException(
				`${logInformation.message} (erreur http)`,
				{ context: logInformation.contexte, source: logInformation.apiSource },
				{ errorDetail: httpNotFoundError.response?.data },
			));
			expect(failure.errorType).toStrictEqual(ErreurMétier.DEMANDE_INCORRECTE);
		});
	});
});
