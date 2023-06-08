import { SentryException } from '~/server/exceptions/sentryException';
import { HttpError } from '~/server/services/http/httpError';

import { DefaultErrorManagementService, LogInformation } from '../../../services/error/errorManagement.service';

export class ApiTrajectoiresProStatistiqueErrorManagementService extends DefaultErrorManagementService {
	protected logHttpError(logInformation: LogInformation, error: HttpError) {
		const errorToLog = new SentryException(
			`${logInformation.message} (erreur http)`,
			{ context: logInformation.contexte, source: logInformation.apiSource },
			{ errorDetail: error.response?.data },
		);
		if (error.status === 404) {
			this.loggerService.warnWithExtra(errorToLog);
		} else {
			this.loggerService.errorWithExtra(errorToLog);
		}
	}
}
