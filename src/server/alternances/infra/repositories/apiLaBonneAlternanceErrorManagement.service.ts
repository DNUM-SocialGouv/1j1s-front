import {
	DefaultErrorManagementService,
	LogInformation, Severity,
} from '~/server/services/error/errorManagement.service';
import { HttpError } from '~/server/services/http/httpError';

export class ApiLaBonneAlternanceErrorManagementServiceSearch extends DefaultErrorManagementService {
	protected logHttpError(error: HttpError, logInformation: LogInformation) {
		if (error.response?.status === 429) {
			const logInformationTooManyRequest = {
				...logInformation,
				message: `${logInformation.message} - trop de requêtes`,
			};
			const logSentry = super.buildHttpErrorToLog(logInformationTooManyRequest, error);
			this.logError(logSentry, Severity.ERROR);
		} else {
			const logSentry = super.buildHttpErrorToLog(logInformation, error);
			this.logError(logSentry, logInformation.severity);
		}
	}
}

export class ApiLaBonneAlternanceErrorManagementServiceGet extends DefaultErrorManagementService {
	protected logHttpError(error: HttpError, logInformation: LogInformation) {
		if (error.response?.status === 404) {
			const logInformationAnnonceNotFound = {
				...logInformation,
				message: `${logInformation.message} - annonce non trouvé/expiré`,
			};
			const logSentry = super.buildHttpErrorToLog(logInformationAnnonceNotFound, error);
			this.logError(logSentry, Severity.WARNING);
		} else {
			const logSentry = super.buildHttpErrorToLog(logInformation, error);
			this.logError(logSentry, logInformation.severity);
		}
	}
}




