import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { ErrorManagementService } from '~/server/services/error/errorManagement.service';

export function anErrorManagementService(override?: Partial<ErrorManagementService>): ErrorManagementService {
	return {
		handleFailureError: jest.fn(() => createFailure(ErreurMétier.DEMANDE_INCORRECTE)),
		...override,
	};
}
