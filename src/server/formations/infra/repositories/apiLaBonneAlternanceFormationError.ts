import { AxiosError } from 'axios';

import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';

export interface ApiLaBonneAlternanceErrorResponse {
	message: string
}

export function handleSearchFailureError(e: unknown, context: string) {
	return handleFailureError(e, `search ${context}`);
}

export function handleGetFailureError(e: unknown, context: string) {
	return handleFailureError(e, `get ${context}`);
}

export function handleFailureError(e: unknown, customContext: string) {
	LoggerService.errorWithExtra(
		new SentryException(
			'[API LaBonneAlternance] Formation : impossible d’effectuer une recherche',
			{ context: customContext, source: 'API LaBonneAlternance Formation' },
			{ errorDetail: (<AxiosError> e).response?.data || (<Error> e).stack },
		),
	);
	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
