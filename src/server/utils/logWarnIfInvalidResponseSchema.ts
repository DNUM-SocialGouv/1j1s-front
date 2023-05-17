import Joi from 'joi';

import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';

export function logWarnIfInvalidResponseSchema<T>(logger: LoggerService, apiName: string, response: T, schema: Joi.Schema) {
	const { error } = schema.validate(response);
	if (error) {
		logger.warnWithExtra(
			new SentryException(
				`[${apiName}] Erreur de validation de la réponse de l’API`,
				{ context: '', source: apiName },
				{ errorDetail: error.details },
			),
		);
	}
}
