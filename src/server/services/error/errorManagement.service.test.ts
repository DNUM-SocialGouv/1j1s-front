import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { DefaultErrorManagementService, LogInformation } from '~/server/services/error/errorManagement.service';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const aLogInformation: LogInformation = {
	apiSource: 'API La bonne alternance',
	contexte: 'search alternance',
	message: '[API LaBonneAlternance] impossible d’effectuer une recherche',
};
describe('DefaultErrorManagementService', () => {
	it('doit créer une failure de service indisponible', () => {
		// GIVEN
		const loggerService = aLoggerService();
		const errorManagementService = new DefaultErrorManagementService(loggerService);
		const httpError = anHttpError();
		const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

		// WHEN
		const result = errorManagementService.handleFailureError(httpError, aLogInformation);

		// THEN
		expect(result).toStrictEqual(expectedFailure);
	});
});
