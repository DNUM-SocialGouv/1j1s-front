import Joi from 'joi';

import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';

export function validateApiResponse(schema: Joi.Schema, data: unknown, logger: LoggerService, api: string) {
	const { error } = schema.validate(data);
	if (error) {
		logger.warnWithExtra(
			new SentryException(
				`[${api}] Erreur de validation de la réponse de l’API`,
				{ context: '', source: api },
				{ errorDetail: error.details },
			),
		);
	}
}
