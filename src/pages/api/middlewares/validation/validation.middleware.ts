import { NextApiHandler } from 'next';
import withJoi, { ValidationSchemas } from 'next-joi';

import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';

export function withValidation(schemas: ValidationSchemas, handler: NextApiHandler): NextApiHandler {
	return withJoi({
		onValidationError: (req, res, error) => {
			LoggerService.warnWithExtra(new SentryException(
				'[QUERY PARAMS URL] les paramètres dans l‘url ne respectent pas le schema de validation',
				{ context: `validation parametre ${req.url}`, source: 'BFF' },
				{ stack: error.stack },
			));
			return res.status(400).json({ error: 'les paramètres dans l‘url ne respectent pas le schema de validation' });
		},
	})(schemas, handler);
}
