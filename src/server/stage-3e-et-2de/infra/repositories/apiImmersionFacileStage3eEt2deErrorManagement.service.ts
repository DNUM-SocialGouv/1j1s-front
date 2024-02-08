import { createFailure } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { DefaultErrorManagementService, LogInformation } from '~/server/services/error/errorManagement.service';
import { isHttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';


export class ApiImmersionFacileStage3eEt2deErrorManagementService extends DefaultErrorManagementService {
	constructor(loggerService: LoggerService) {
		super(loggerService);
	}

	handleFailureError(error: unknown, logInformation: LogInformation) {
		if (isHttpError(error) && error.status === 409) {
			return createFailure(ErreurMetier.CONFLIT_D_IDENTIFIANT);
		}
		return super.handleFailureError(error, logInformation);
	}
}
