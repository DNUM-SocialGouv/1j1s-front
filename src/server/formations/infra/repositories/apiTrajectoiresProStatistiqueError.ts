import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { isHttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';

export function handleFailureError(e: unknown, customContext: string, loggerService: LoggerService) {
	if (isHttpError(e)) {
		loggerService.errorWithExtra(
			new SentryException(
				'[API Trajectoires Pro] statistique de formation non disponible',
				{ context: customContext, source: 'API Trajectoires Pro' },
				{ errorDetail: e.response?.data },
			),
		);
		return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
	}
	loggerService.errorWithExtra(
		new SentryException(
			'[API Trajectoires Pro] statistique de formation non disponible',
			{ context: customContext, source: 'API Trajectoires Pro' },
			{ stacktrace: (<Error> e).stack },
		),
	);
	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
