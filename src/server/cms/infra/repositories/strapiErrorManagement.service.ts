import { createFailure, Failure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMétier.types';
import {
	DefaultErrorManagementService,
} from '~/server/services/error/errorManagement.service';
import { HttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';

export class StrapiErrorManagementService extends DefaultErrorManagementService {
	constructor(loggerService: LoggerService) {
		super(loggerService);
	}
	protected createFailureForHttpError(error: HttpError) {
		if (error.response?.status === 400 && error?.response?.data?.message === '[API Strapi] 400 Bad request pour la ressource') {
			return createFailure(ErreurMetier.DEMANDE_INCORRECTE);
		} else if (error.response?.status === 401 && error?.response?.data?.message === '[API Strapi] 401 Unauthorized') {
			return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
		} else if (error.response?.status === 403 && error?.response?.data?.message === '[API Strapi] 403 Forbidden pour la ressource') {
			return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
		} else if (error.response?.status === 404 && error?.response?.data?.message === '[API Strapi] 404 Contenu indisponible') {
			return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
		} else if (error.response?.status === 500 && error?.response?.data?.message === '[API Strapi] 500 Internal server error') {
			return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
		} else {
			return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
		}
	}

	protected createFailureForInternalError(): Failure {
		return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
	}
}


