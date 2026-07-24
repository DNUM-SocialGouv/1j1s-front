import { StrapiErrorManagementService } from '~/server/cms/infra/repositories/strapiErrorManagement.service';
import { aStrapiHttpError } from '~/server/cms/infra/repositories/strapiHttpError.fixture';
import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { HttpError } from '~/server/services/http/httpError';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const aLogInformationCms = aLogInformation({
	apiSource: 'API Strapi',
	contexte: 'détail strapi',
	message: 'Erreur inconnue - Impossible de récupérer la ressource',
});

describe('StrapiErrorManagementService', () => {
	describe('lorsque l‘erreur est une erreur http', () => {
		it.each([
			[400, ErreurMetier.DEMANDE_INCORRECTE],
			[404, ErreurMetier.CONTENU_INDISPONIBLE],
			[401, ErreurMetier.SERVICE_INDISPONIBLE],
			[403, ErreurMetier.SERVICE_INDISPONIBLE],
			[500, ErreurMetier.SERVICE_INDISPONIBLE],
			[503, ErreurMetier.SERVICE_INDISPONIBLE],
			[418, ErreurMetier.CONTENU_INDISPONIBLE],
		])('crée une failure de type attendu pour un statut %i (%s)', (statut, erreurMetierAttendue) => {
			// GIVEN
			const loggerService = aLoggerService();
			const strapiErrorManagementService = new StrapiErrorManagementService(loggerService);
			const httpError = aStrapiHttpError(statut);
			const expectedFailure = createFailure(erreurMetierAttendue);

			// WHEN
			const result = strapiErrorManagementService.handleFailureError(httpError, aLogInformationCms);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});

		it('crée une failure de contenu indisponible lorsque le statut est indéterminé', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const strapiErrorManagementService = new StrapiErrorManagementService(loggerService);
			const httpErrorSansReponse = new HttpError(500, '');
			const expectedFailure = createFailure(ErreurMetier.CONTENU_INDISPONIBLE);

			// WHEN
			const result = strapiErrorManagementService.handleFailureError(httpErrorSansReponse, aLogInformationCms);

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
			const expectedFailure = createFailure(ErreurMetier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = strapiErrorManagementService.handleFailureError(internalError, aLogInformationCms);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});
});
