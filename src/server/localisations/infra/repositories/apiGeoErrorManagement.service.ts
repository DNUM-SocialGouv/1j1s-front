import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { DefaultErrorManagementService, LogInformation } from '~/server/services/error/errorManagement.service';
import { HttpError, isHttpError } from '~/server/services/http/httpError';

const error400IdIncorrect = 'Le format de l\'id de la localisation recherchée est incorrect.';

export class ApiGeoErrorManagementService extends DefaultErrorManagementService {

	handleFailureError(error: unknown, logInformation: LogInformation) {
		if (isHttpError(error)) {
			this.logHttpError(logInformation, error);
			return this.createFailureForHttpError(error);
		}
		this.logInternalError(logInformation, error);
		return this.createFailureForInternalError();
	}

	protected logHttpError(logInformation: LogInformation, error: HttpError) {
		const logSentry = super.buildHttpErrorToLog(logInformation, error);
		if (error.response?.status === 400 && error.response.data.message === error400IdIncorrect) {
			this.loggerService.warnWithExtra(logSentry);
		} else {
			this.loggerService.errorWithExtra(logSentry);
		}
	}

	protected createFailureForInternalError(): Failure {
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}
}

