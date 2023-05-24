import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { HttpError, isHttpError } from '~/server/services/http/httpError';

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
		if(isHttpError(error)){
			return this.handleHttpError(error);
		}
		return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
	}

	private handleHttpError(error: HttpError) {
		if (error.response?.status.toString().startsWith('50')) {
			return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
		}
		if (error.response?.status === 400) {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
		if (error.response?.status === 404) {
			return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
		}
		return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
	}
}
