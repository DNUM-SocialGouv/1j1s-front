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
	describe('lorsque l‘erreur est une Http error', () => {
		it('qui commence par 50 doit créer une failure service indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const httpError = anHttpError(500);
			const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = errorManagementService.handleFailureError(httpError, aLogInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});

		it('qui est une 404 doit créer une failure contenu indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const httpError = anHttpError(404);
			const expectedFailure = createFailure(ErreurMétier.CONTENU_INDISPONIBLE);

			// WHEN
			const result = errorManagementService.handleFailureError(httpError, aLogInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});

		it('qui est une 400 doit créer une failure demande incorrecte', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const httpError = anHttpError(400);
			const expectedFailure = createFailure(ErreurMétier.DEMANDE_INCORRECTE);

			// WHEN
			const result = errorManagementService.handleFailureError(httpError, aLogInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});

		it('qui est une autre erreur doit créer une failure contenu indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const httpError = anHttpError(409);
			const expectedFailure = createFailure(ErreurMétier.CONTENU_INDISPONIBLE);

			// WHEN
			const result = errorManagementService.handleFailureError(httpError, aLogInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});

	describe('lorsque l‘erreur est une erreur interne', () => {
		it('doit créer une failure de contenu indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const errorManagementService = new DefaultErrorManagementService(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			const expectedFailure = createFailure(ErreurMétier.CONTENU_INDISPONIBLE);

			// WHEN
			const result = errorManagementService.handleFailureError(internalError, aLogInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});
});
