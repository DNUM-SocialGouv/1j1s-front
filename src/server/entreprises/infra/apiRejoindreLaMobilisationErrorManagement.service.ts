import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { DefaultErrorManagementService } from '~/server/services/error/errorManagement.service';
import { HttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';

export const enum ApiRejoindreLaMobilisationMessageError {
	ERROR_400 = '[API Rejoindre Mobilisation] 400 Bad request pour la ressource',
	ERROR_409 = '[API Rejoindre Mobilisation] 409 Conflict Identifiant',
	ERROR_404 = '[API Rejoindre Mobilisation] 404 Contenu indisponible',
}

export class ApiRejoindreLaMobilisationErrorManagementService extends DefaultErrorManagementService {
	constructor(loggerService: LoggerService) {
		super(loggerService);
	}

	protected createFailureForHttpError(error: HttpError) {
		if (error.response?.status === 400 && error?.response?.data?.message === ApiRejoindreLaMobilisationMessageError.ERROR_400) {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
		if (error.response?.status === 409 && error?.response?.data?.message === ApiRejoindreLaMobilisationMessageError.ERROR_409) {
			return createFailure(ErreurMétier.CONFLIT_D_IDENTIFIANT);
		}
		if (error.response?.status === 404 && error?.response?.data?.message === ApiRejoindreLaMobilisationMessageError.ERROR_404) {
			return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
		}
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}

	protected createFailureForInternalError(): Failure {
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}
}


