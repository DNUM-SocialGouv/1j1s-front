import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { HttpError, isHttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';

export function handleSearchFailureError(e: unknown, context: string) {
	return handleFailureError(e, `search ${context}`);
}

export function handleGetFailureError(e: unknown, context: string) {
	return handleFailureError(e, `get ${context}`);
}

export function handleFailureError(e: unknown, customContext: string) {
	if (isHttpError(e)) {
		const error = e as HttpError;
		LoggerService.errorWithExtra(
			new SentryException(
				'[API LaBonneAlternance] Formation : impossible d’effectuer une recherche',
				{ context: customContext, source: 'API LaBonneAlternance Formation' },
				{ errorDetail: error.response?.data },
			),
		);
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}
	LoggerService.errorWithExtra(
		new SentryException(
			'[API LaBonneAlternance] Formation : impossible d’effectuer une recherche',
			{ context: customContext, source: 'API LaBonneAlternance Formation' },
			{ stacktrace: (<Error> e).stack },
		),
	);
	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);}
