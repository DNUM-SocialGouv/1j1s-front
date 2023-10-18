import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import {
	DefaultErrorManagementService,
	LogInformation,
} from '~/server/services/error/errorManagement.service';
import { HttpError } from '~/server/services/http/httpError';

export const enum ApiRejoindreLaMobilisationMessageError {
	ERROR_400 = '[API Rejoindre Mobilisation] 400 Bad request pour la ressource',
	ERROR_409 = '[API Rejoindre Mobilisation] 409 Conflict Identifiant',
	ERROR_404 = '[API Rejoindre Mobilisation] 404 Contenu indisponible',
}

export class ApiRejoindreLaMobilisationErrorManagementService extends DefaultErrorManagementService {
	protected logHttpError(error: HttpError, logInformation: LogInformation) {
		const errorToLog = this.buildHttpErrorToLog(logInformation, error);
		this.logError(errorToLog, logInformation.severity);
	}

	protected logInternalError(logInformation: LogInformation, error: unknown) {
		const errorToLog = this.buildInternalErrorToLog(logInformation, error);
		this.logError(errorToLog, logInformation.severity);
	}

	protected createFailureForHttpError(error: HttpError) {
		if (error.response?.status === 400 && error?.response?.data?.message === ApiRejoindreLaMobilisationMessageError.ERROR_400) {
			return createFailure(ErreurMetier.DEMANDE_INCORRECTE);
		}
		if (error.response?.status === 409 && error?.response?.data?.message === ApiRejoindreLaMobilisationMessageError.ERROR_409) {
			return createFailure(ErreurMetier.CONFLIT_D_IDENTIFIANT);
		}
		if (error.response?.status === 404 && error?.response?.data?.message === ApiRejoindreLaMobilisationMessageError.ERROR_404) {
			return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
		}
		return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
	}

	protected createFailureForInternalError(): Failure {
		return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
	}
}


