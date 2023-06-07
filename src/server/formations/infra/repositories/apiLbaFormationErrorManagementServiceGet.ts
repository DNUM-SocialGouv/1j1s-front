import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { DefaultErrorManagementService, LogInformation } from '~/server/services/error/errorManagement.service';

export class ApiLbaFormationErrorManagementServiceGet extends DefaultErrorManagementService {
	handleFailureError(error: ErreurMétier, logInformation: LogInformation): Failure {
		super.handleFailureError(error, logInformation); // SULI pas ouf
		return createFailure(error);
	}
}
