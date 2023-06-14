import {
	ApiRejoindreLaMobilisationErrorManagementService,
	ApiRejoindreLaMobilisationMessageError,
} from '~/server/entreprises/infra/apiRejoindreLaMobilisationErrorManagement.service';
import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { aLogInformation } from '~/server/services/error/errorManagement.fixture';
import { anHttpError } from '~/server/services/http/httpError.fixture';
import { aLoggerService } from '~/server/services/logger.service.fixture';

const logInformation = aLogInformation({
	apiSource: 'API Rejoindre Mobilisation',
	contexte: 'formulaire rejoindre mobilisation',
	message: 'Erreur inconnue - Insertion formulaire',
});

describe('apiRejoindreLaMobilisationErrorManagementService', () => {
	describe('lorsque l‘erreur est une erreur http', () => {
		it('lorsque l‘erreur est une erreur 400 et le message est celui attendu renvoie la bonne failure', () => {
			// GIVEN
			const errorCode = 400;
			const loggerService = aLoggerService();
			const apiRejoindreLaMobilisationErrorManagementService = new ApiRejoindreLaMobilisationErrorManagementService(loggerService);
			const httpError = anHttpError(errorCode, ApiRejoindreLaMobilisationMessageError.ERROR_400);
			const expectedFailure = createFailure(ErreurMétier.DEMANDE_INCORRECTE);

			// WHEN
			const result = apiRejoindreLaMobilisationErrorManagementService.handleFailureError(httpError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
		it('lorsque l‘erreur est une erreur 404 et le message est celui attendu renvoie la bonne failure', () => {
			// GIVEN
			const errorCode = 404;
			const loggerService = aLoggerService();
			const apiRejoindreLaMobilisationErrorManagementService = new ApiRejoindreLaMobilisationErrorManagementService(loggerService);
			const httpError = anHttpError(errorCode, ApiRejoindreLaMobilisationMessageError.ERROR_404);
			const expectedFailure = createFailure(ErreurMétier.CONTENU_INDISPONIBLE);

			// WHEN
			const result = apiRejoindreLaMobilisationErrorManagementService.handleFailureError(httpError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
		it('lorsque l‘erreur est une erreur 409 et le message est celui attendu renvoie la bonne failure', () => {
			// GIVEN
			const errorCode = 409;
			const loggerService = aLoggerService();
			const apiRejoindreLaMobilisationErrorManagementService = new ApiRejoindreLaMobilisationErrorManagementService(loggerService);
			const httpError = anHttpError(errorCode, ApiRejoindreLaMobilisationMessageError.ERROR_409);
			const expectedFailure = createFailure(ErreurMétier.CONFLIT_D_IDENTIFIANT);

			// WHEN
			const result = apiRejoindreLaMobilisationErrorManagementService.handleFailureError(httpError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
		it('renvoie une erreur par default lorsque le message n‘est pas celui attendu', () => {
			// GIVEN
			const errorCode = 409;
			const loggerService = aLoggerService();
			const apiRejoindreLaMobilisationErrorManagementService = new ApiRejoindreLaMobilisationErrorManagementService(loggerService);
			const httpError = anHttpError(errorCode, 'pas le bon message');
			const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = apiRejoindreLaMobilisationErrorManagementService.handleFailureError(httpError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});
	describe('lorsque l‘erreur est une erreur interne', () => {
		it('crée une failure de service indisponible', () => {
			// GIVEN
			const loggerService = aLoggerService();
			const apiRejoindreLaMobilisationErrorManagementService = new ApiRejoindreLaMobilisationErrorManagementService(loggerService);
			const internalError = new Error('ceci est une erreur interne');
			const expectedFailure = createFailure(ErreurMétier.SERVICE_INDISPONIBLE);

			// WHEN
			const result = apiRejoindreLaMobilisationErrorManagementService.handleFailureError(internalError, logInformation);

			// THEN
			expect(result).toStrictEqual(expectedFailure);
		});
	});
});
