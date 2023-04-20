import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { isHttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';

export function handleSearchFailureError(e: unknown, context: string, loggerService: LoggerService) {
	return handleFailureError(e, `search ${context}`, loggerService);
}

export function handleGetFailureError(e: unknown, context: string, loggerService: LoggerService) {
	return handleFailureError(e, `get ${context}`, loggerService);
}

export function handleGetMetierFailureError(e: unknown, context: string, loggerService: LoggerService) {
	return handleFailureError(e, `get metier ${context}`, loggerService);
}

export function handleFailureError(e: unknown, customContext: string, loggerService: LoggerService) {
	if (isHttpError(e)) {
		loggerService.errorWithExtra(
			new SentryException(
				'[API LaBonneAlternance] impossible d’effectuer une recherche',
				{ context: customContext, source: 'API LaBonneAlternance' },
				{ errorDetail: e.response?.data },
			),
		);
		return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
	}
	loggerService.errorWithExtra(
		new SentryException(
			'[API LaBonneAlternance] impossible d’effectuer une recherche',
			{ context: customContext, source: 'API LaBonneAlternance' },
			{ stacktrace: (<Error> e).stack },
		),
	);
	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
