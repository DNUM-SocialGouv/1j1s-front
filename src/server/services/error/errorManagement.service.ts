import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
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
}

export interface ErrorManagementWithErrorCheckingService extends ErrorManagementService {
	isError(response: unknown): boolean
}

export class DefaultErrorManagementService implements ErrorManagementService {
	constructor(protected loggerService: LoggerService) {
	}

	handleFailureError(error: unknown, logInformation: LogInformation): Failure {
		if (isHttpError(error)) {
			this.logHttpError(logInformation, error);
			return this.createFailureForHttpError(error);
		}
		this.logInternalError(logInformation, error);
		return this.createFailureForInternalError();
	}

	protected logHttpError(logInformation: LogInformation, error: HttpError) {
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
		this.loggerService.errorWithExtra(errorToLog);
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

	protected createFailureForInternalError() {
		return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
	}

	protected createFailureForHttpError(error: HttpError) {
		if (error.response?.status.toString().startsWith('50')) {
			return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
		}
		if (error.response?.status === 400) {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
		if (error.response?.status === 404) {
			return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
		}
		return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
	}
}

