import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { DefaultErrorManagementService } from '~/server/services/error/errorManagement.service';
import { HttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';

export class StrapiErrorManagementService extends DefaultErrorManagementService {
	constructor(loggerService: LoggerService) {
		super(loggerService);
	}

	protected createFailureForHttpError(error: HttpError): Failure {
		const statut = error.response?.status;
		if (statut === 400) return createFailure(ErreurMetier.DEMANDE_INCORRECTE);
		if (statut === 404) return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
		if (statut === 401 || statut === 403) return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
		if (statut !== undefined && statut >= 500) return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
		return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
	}

	protected createFailureForInternalError(): Failure {
		return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
	}
}


