import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { isHttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';

export function handleSearchFailureError(e: unknown, context: string) {
	return handleFailureError(e, `search ${context}`);
}

export function handleGetFailureError(e: unknown, context: string) {
	return handleFailureError(e, `get ${context}`);
}

export function handleGetMetierFailureError(e: unknown, context: string) {
	return handleFailureError(e, `get metier ${context}`);
}

export function handleFailureError(e: unknown, customContext: string) {
	if (isHttpError(e)) {
		LoggerService.errorWithExtra(
			new SentryException(
				'[API LaBonneAlternance] impossible d’effectuer une recherche',
				{ context: customContext, source: 'API LaBonneAlternance' },
				{ errorDetail: e.response?.data },
			),
		);
		return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
	}
	LoggerService.errorWithExtra(
		new SentryException(
			'[API LaBonneAlternance] impossible d’effectuer une recherche',
			{ context: customContext, source: 'API LaBonneAlternance' },
			{ stacktrace: (<Error> e).stack },
		),
	);
	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
