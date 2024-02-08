import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { DefaultErrorManagementService } from '~/server/services/error/errorManagement.service';
import { HttpError } from '~/server/services/http/httpError';
import { aLoggerService } from '~/server/services/logger.service.fixture';
import {
	ApiImmersionFacileStage3eEt2deErrorManagementService,
} from '~/server/stage-3e-et-2de/infra/repositories/apiImmersionFacileStage3eEt2deErrorManagement.service';

describe('apiImmersionFacileStage3eEt2deErrorManagement.service', () => {
	describe('handleFailureError', () => {
		describe('lorsque l’erreur est une erreur HTTP avec un statut 409', () => {
			it('retourne un échec avec l’erreur métier CONFLIT_D_IDENTIFIANT et ne log pas l’erreur', () => {
				// Given
				const error = new HttpError(409, 'Conflict');
				const logInformation = {
					apiSource: 'API Immersion Facile Stage 3e et 2de',
					contexte: 'search stage 3e et 2de',
					message: 'impossible d’effectuer une recherche de stage 3e et 2de',
				};
				const loggerService = aLoggerService();
				const errorManagementService = new ApiImmersionFacileStage3eEt2deErrorManagementService(loggerService);
				
				// When
				const result = errorManagementService.handleFailureError(error, logInformation);
				
				// Then
				expect(result).toEqual(createFailure(ErreurMetier.CONFLIT_D_IDENTIFIANT));
				expect(loggerService.error).not.toHaveBeenCalled();
				expect(loggerService.errorWithExtra).not.toHaveBeenCalled();
			});
		});

		describe('lorsque l’erreur n’est pas une erreur HTTP avec un statut 409', () => {
			it('retourne le résultat de la méthode parent', () => {
				// Given
				const error = new Error('Internal error');
				const logInformation = {
					apiSource: 'API Immersion Facile Stage 3e et 2de',
					contexte: 'search stage 3e et 2de',
					message: 'impossible d’effectuer une recherche de stage 3e et 2de',
				};
				const loggerService = aLoggerService();
				const errorManagementService = new ApiImmersionFacileStage3eEt2deErrorManagementService(loggerService);
				const handleFailureErrorSpy = jest.spyOn(DefaultErrorManagementService.prototype, 'handleFailureError');

				// When
				const result = errorManagementService.handleFailureError(error, logInformation);

				// Then
				expect(result).toEqual(createFailure(ErreurMetier.CONTENU_INDISPONIBLE));
				expect(handleFailureErrorSpy).toHaveBeenNthCalledWith(1, error, logInformation);
			});
		});
	});
});
