import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { createFailure, Failure } from '../../errors/either';
import { LoggerService } from '../logger.service';

export interface LogInformation {
    message: string
    contexte: string
    apiSource: string
}

interface ErrorManagementService {
    handleFailureError(error: Error, logInformation: LogInformation, loggerService: LoggerService):  Failure
}

export class DefaultErrorManagementService implements ErrorManagementService {
	constructor(private loggerService: LoggerService) {}

	handleFailureError(error: Error, logInformation: LogInformation): Failure {
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}
}
