import { createFailure, Failure } from '../../errors/either';
import { ErreurMétier } from '../../errors/erreurMétier.types';
import { DefaultErrorManagementService } from '../../services/error/errorManagement.service';
import { HttpError } from '../../services/http/httpError';

export class ApiEtablissementPublicErrorManagementService extends DefaultErrorManagementService {
	protected createFailureForHttpError(error: HttpError): Failure {
		if (error.response?.status === 404) {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}

	protected createFailureForInternalError(): Failure {
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}
}
