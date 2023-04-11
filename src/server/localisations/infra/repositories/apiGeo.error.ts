import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { isHttpError } from '~/server/services/http/httpError';
import { LoggerService } from '~/server/services/logger.service';




export function handleGetFailureError(e: unknown, context: string, loggerService: LoggerService) {
	if (isHttpError(e)) {
		if(e.response?.status === 400 && e.response.data?.message === 'Le format de l\'id de la localisation recherchée est incorrect.') {
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		} else {
			loggerService.warnWithExtra(
				new SentryException(
					'[API Localisation] impossible de récupérer une ressource',
					{ context: `détail ${context}`, source: 'API Localisation' },
					{ errorDetail: e.response?.data },
				),
			);
			return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
		}
	}
	loggerService.errorWithExtra(new SentryException(
		'[API Localisation] impossible de récupérer une ressource',
		{ context: 'détail localisation', source: 'API Localisation' },
		{ stacktrace: (<Error> e).stack },
	));

	return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
}
