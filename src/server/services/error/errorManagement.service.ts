import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { HttpError, isHttpError } from '~/server/services/http/httpError';

import { createFailure, Failure } from '../../errors/either';
import { LoggerService } from '../logger.service';

export interface LogInformation {
	message: string
	contexte: string
	apiSource: string
}

export interface ErrorManagementService {
	handleFailureError(error: unknown, logInformation: LogInformation): Failure
}

export class DefaultErrorManagementService implements ErrorManagementService {
	constructor(private loggerService: LoggerService) {
	}

	handleFailureError(error: unknown, logInformation: LogInformation): Failure {
		if (isHttpError(error)) {
			this.logHttpError(logInformation, error);
			return this.handleHttpError(error);
		}
		this.logInternalError(logInformation, error);
		return createFailure(ErreurMétier.CONTENU_INDISPONIBLE);
	}

	private logHttpError(logInformation: LogInformation, error: HttpError) {
		const errorToLog = new SentryException(
			`${logInformation.message} (erreur http)`,
			{ context: logInformation.contexte, source: logInformation.apiSource },
			{ errorDetail: error.response?.data },
		);

		this.loggerService.errorWithExtra(errorToLog);
	}

	private logInternalError(logInformation: LogInformation, error: unknown) {
		let extra;
		if (error instanceof Error) {
			extra = { stacktrace: error.stack };
		} else {
			extra = { error: JSON.stringify(error) };
		}
		const errorToLog = new SentryException(
			`${logInformation.message} (erreur interne)`,
			{ context: logInformation.contexte, source: logInformation.apiSource },
			extra,
		);
		this.loggerService.errorWithExtra(errorToLog);
	}

	private handleHttpError(error: HttpError) {
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
