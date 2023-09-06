import {
	DefaultErrorManagementService,
	LogInformation, Severity,
} from '~/server/services/error/errorManagement.service';
import { HttpError } from '~/server/services/http/httpError';

export const enum ApiLaBonneAlternanceApiMessageError {
	ERROR_404_EXPIRED = 'expired_job',
	ERROR_404_NOT_FOUND = 'not_found',
	ERROR_429_TOO_MANY_REQUEST = 'Too many requests, please try again later.'
}

export class ApiLaBonneAlternanceErrorManagementServiceSearch extends DefaultErrorManagementService {
	protected logHttpError(logInformation: LogInformation, error: HttpError) {
		if (error.response?.status === 429 && (error.response.data === ApiLaBonneAlternanceApiMessageError.ERROR_429_TOO_MANY_REQUEST)) {
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
	protected logHttpError(logInformation: LogInformation, error: HttpError) {
		if (error.response?.status === 404 && (error.response.data.error === ApiLaBonneAlternanceApiMessageError.ERROR_404_EXPIRED
			|| error.response.data.error === ApiLaBonneAlternanceApiMessageError.ERROR_404_NOT_FOUND)) {
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




