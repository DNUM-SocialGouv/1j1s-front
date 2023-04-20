import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { isHttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';

export function handleGetFailureError(e: unknown, context: string, loggerService: LoggerService) {
	if (isHttpError(e)) {
		if (e.response?.status === 400 && e?.response.data?.message === 'Le format de l’id de l’adresse recherchée est incorrect.') {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		} if(e.response?.status === 504) {
			return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
		} else {
			loggerService.warnWithExtra(
				new SentryException(
					'[API Adresse] impossible de récupérer une ressource',
					{ context: `détail ${context}`, source: 'API Adresse' },
					{ errorDetail: e.response?.data },
				),
			);
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
	}
	loggerService.errorWithExtra(new SentryException(
		'[API Adresse] impossible de récupérer une ressource',
		{ context: 'détail adresse', source: 'API Adresse' },
		{ stacktrace: (<Error> e).stack },
	));

	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
