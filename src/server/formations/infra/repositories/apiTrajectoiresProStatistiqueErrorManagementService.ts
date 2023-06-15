import { DefaultErrorManagementService, LogInformation } from '~/server/services/error/errorManagement.service';
import { HttpError } from '~/server/services/http/httpError';


export class ApiTrajectoiresProStatistiqueErrorManagementService extends DefaultErrorManagementService {
	protected logHttpError(logInformation: LogInformation, error: HttpError) {
		const errorToLog = super.buildHttpErrorToLog(logInformation, error);
		if (error.status === 404) {
			this.loggerService.warnWithExtra(errorToLog);
		} else {
			this.loggerService.errorWithExtra(errorToLog);
		}
	}
}
