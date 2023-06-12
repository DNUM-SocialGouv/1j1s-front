import { StrapiErrorManagementService } from '~/server/cms/infra/repositories/strapiErrorManagement.service';
import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const aLogInformationCms = aLogInformation({
	apiSource: 'API Strapi',
	contexte: 'détail strapi',
	message: 'Erreur inconnue - Impossible de récupérer la ressource',
});
describe('StrapiErrorManagementService', () => {
	describe('lorsque l‘erreur est une erreur http', () => {
		const errorCode = 401;
		it('renvoie une erreur customisée en fonction du message', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const strapiErrorManagementService = new StrapiErrorManagementService(loggerService);
			const httpError = anHttpError(errorCode, '[API Strapi] 401 Unauthorized');
			const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = strapiErrorManagementService.handleFailureError(httpError, aLogInformationCms);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
		it('renvoie une erreur par default lorsque le message n‘est pas celui attendu', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const strapiErrorManagementService = new StrapiErrorManagementService(loggerService);
			const httpError = anHttpError(errorCode, 'pas le bon message');
			const expectedFailure = createFailure(ErreurMétier.CONTENU_INDISPONIBLE);

			// WHEN
			const result = strapiErrorManagementService.handleFailureError(httpError, aLogInformationCms);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});
	describe('lorsque l‘erreur est une erreur interne', () => {
		it('crée une failure de service indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const strapiErrorManagementService = new StrapiErrorManagementService(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = strapiErrorManagementService.handleFailureError(internalError, aLogInformationCms);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});
});
