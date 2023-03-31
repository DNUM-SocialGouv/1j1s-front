import axios, { AxiosError } from 'axios';

import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';

export interface ApiTrajectoiresProStatistiqueErrorResponse {
	message: string
}

export function handleFailureError(e: unknown, customContext: string) {
	if (axios.isAxiosError(e)) {
		const error = e as AxiosError<ApiTrajectoiresProStatistiqueErrorResponse>;
		LoggerService.errorWithExtra(
			new SentryException(
				'[API Trajectoires Pro] statistique de formation non disponible',
				{ context: customContext, source: 'API Trajectoires Pro' },
				{ errorDetail: error.response?.data },
			),
		);
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}
	LoggerService.errorWithExtra(
		new SentryException(
			'[API Trajectoires Pro] statistique de formation non disponible',
			{ context: customContext, source: 'API Trajectoires Pro' },
			{ stacktrace: (<Error> e).stack },
		),
	);
	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
