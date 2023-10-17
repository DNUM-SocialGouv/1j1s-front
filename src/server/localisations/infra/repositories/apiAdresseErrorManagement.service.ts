import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import {
	DefaultErrorManagementService,
	LogInformation,
	Severity,
} from '~/server/services/error/errorManagement.service';
import { HttpError, isHttpError } from '~/server/services/http/httpError';

const error400IdIncorrect = 'Le format de l’id de l’adresse recherchée est incorrect.';

export class ApiAdresseErrorManagementService extends DefaultErrorManagementService {

	handleFailureError(error: unknown, logInformation: LogInformation) {
		if (isHttpError(error)) {
			this.logHttpError(error, logInformation);
			return this.createFailureForHttpError(error);
		}
		this.logInternalError(logInformation, error);
		return this.createFailureForInternalError();
	}

	protected logHttpError(error: HttpError, logInformation: LogInformation) {
		const logSentry = super.buildHttpErrorToLog(logInformation, error);
		if (error.response?.status === 400 && error.response.data.message === error400IdIncorrect) {
			this.logError(logSentry, Severity.WARNING);
		} else {
			this.logError(logSentry, Severity.ERROR);
		}
	}

	protected createFailureForInternalError(): Failure {
		return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
	}
}

