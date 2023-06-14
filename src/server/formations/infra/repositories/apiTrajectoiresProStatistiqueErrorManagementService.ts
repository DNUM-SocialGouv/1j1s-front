import { SentryException } from '~/server/exceptions/sentryException';
import { DefaultErrorManagementService, LogInformation } from '~/server/services/error/errorManagement.service';
import { HttpError } from '~/server/services/http/httpError';


export class ApiTrajectoiresProStatistiqueErrorManagementService extends DefaultErrorManagementService {
	protected logHttpError(logInformation: LogInformation, error: HttpError) {
		const errorToLog = new SentryException(
			`[${logInformation.apiSource}] ${logInformation.message} (erreur http)`,
			{ context: logInformation.contexte, source: logInformation.apiSource },
			{ errorDetail: error.response?.data },
		); // TODO SULI utiliser super.buildHttpErrorToLog après rebase
		if (error.status === 404) {
			this.loggerService.warnWithExtra(errorToLog);
		} else {
			this.loggerService.errorWithExtra(errorToLog);
		}
	}
}
