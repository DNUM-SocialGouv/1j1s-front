import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { ApiValidationError } from '~/server/services/error/apiValidationError';
import { HttpError, isHttpError } from '~/server/services/http/httpError';

import { createFailure, Failure } from '../../errors/either';
import { LoggerService } from '../logger.service';

export enum Severity {
	FATAL = 'fatal',
	ERROR = 'error',
	WARNING = 'warning',
}

export interface LogInformation {
	message: string
	contexte: string
	apiSource: string
	severity?: Severity
}

export interface ErrorManagementService {
	handleFailureError(error: unknown, logInformation: LogInformation): Failure

	logValidationError(error: ApiValidationError, logInformation: LogInformation): void
}

export interface ErrorManagementWithErrorCheckingService extends ErrorManagementService {
	isError(response: unknown): boolean
}

export class DefaultErrorManagementService implements ErrorManagementService {
	constructor(protected loggerService: LoggerService) {
	}

	handleFailureError(error: unknown, logInformation: LogInformation): Failure {
		if (isHttpError(error)) {
			this.logHttpError(error, logInformation);
			return this.createFailureForHttpError(error);
		}
		this.logInternalError(logInformation, error);
		return this.createFailureForInternalError();
	}

	logValidationError(error: ApiValidationError, logInformation: LogInformation): void {
		const errorToLog = this.buildApiValidationErrorToLog(logInformation, error);
		this.loggerService.warnWithExtra(errorToLog);
	}

	protected logHttpError(error: HttpError, logInformation: LogInformation) {
		const errorToLog = this.buildHttpErrorToLog(logInformation, error);
		this.logError(errorToLog, logInformation.severity);
	}

	protected logError(errorToLog: SentryException, severity: Severity | undefined) {
		switch (severity) {
			case Severity.WARNING:
				this.loggerService.warnWithExtra(errorToLog);
				break;
			case Severity.FATAL:
				this.loggerService.fatalWithExtra(errorToLog);
				break;
			default:
				this.loggerService.errorWithExtra(errorToLog);
				break;
		}
	}

	protected buildHttpErrorToLog(logInformation: LogInformation, error: HttpError) {
		return new SentryException(
			`[${logInformation.apiSource}] ${logInformation.message} (erreur http)`,
			{ context: logInformation.contexte, source: logInformation.apiSource },
			{ errorDetail: error.response?.data },
		);
	}

	protected logInternalError(logInformation: LogInformation, error: unknown) {
		const errorToLog = this.buildInternalErrorToLog(logInformation, error);
		this.logError(errorToLog, logInformation.severity);
	}

	protected buildInternalErrorToLog(logInformation: LogInformation, error: unknown) {
		const extra = error instanceof Error
			? { stacktrace: error.stack }
			: { error: JSON.stringify(error) };

		return new SentryException(
			`[${logInformation.apiSource}] ${logInformation.message} (erreur interne)`,
			{ context: logInformation.contexte, source: logInformation.apiSource },
			extra,
		);
	}

	protected buildApiValidationErrorToLog(logInformation: LogInformation, error: ApiValidationError) {
		const extra = { error: JSON.stringify({
			detailsOfValidationError: error.detailsOfValidationError,
			originalResponse: error.originalResponse,
		}) };

		return new SentryException(
			`[${logInformation.apiSource}] ${logInformation.message} (erreur de validation)`,
			{ context: logInformation.contexte, source: logInformation.apiSource },
			extra,
		);
	}

	protected createFailureForInternalError() {
		return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
	}

	protected createFailureForHttpError(error: HttpError) {
		if (error.response?.status.toString().startsWith('50')) {
			return createFailure(ErreurMetier.SERVICE_INDISPONIBLE);
		}
		if (error.response?.status === 400) {
			return createFailure(ErreurMetier.DEMANDE_INCORRECTE);
		}
		if (error.response?.status === 404) {
			return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
		}
		return createFailure(ErreurMetier.CONTENU_INDISPONIBLE);
	}
}

