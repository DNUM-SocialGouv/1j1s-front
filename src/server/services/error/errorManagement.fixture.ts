import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ErrorManagementService, LogInformation } from '~/server/services/error/errorManagement.service';

export function anErrorManagementService(override?: Partial<ErrorManagementService>): ErrorManagementService {
	return {
		handleFailureError: jest.fn(() => createFailure(ErreurMétier.DEMANDE_INCORRECTE)),
		...override,
	};
}

export function aLogInformation(override?: Partial<LogInformation>): LogInformation {
	return {
		apiSource: 'API Source',
		contexte: 'contexte de la requête', message: '[API Source] message d‘erreur',
		...override,
	};
}
