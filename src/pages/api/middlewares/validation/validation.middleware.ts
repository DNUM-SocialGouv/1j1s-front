import { NextApiHandler } from 'next';
import withJoi, { ValidationSchemas } from 'next-joi';

import { SentryException } from '~/server/exceptions/sentryException';
import { dependencies } from '~/server/start';

export function withValidation(schemas: ValidationSchemas, handler: NextApiHandler): NextApiHandler {
	return withJoi({
		onValidationError: (req, res, error) => {
			dependencies.loggerService.warnWithExtra(new SentryException(
				'[QUERY PARAMS URL] les paramètres dans l‘url ne respectent pas le schema de validation',
				{ context: `validation parametre ${req.url}`, source: 'BFF' },
				{ stack: error.stack },
			));
			return res.status(400).json({ error: 'les paramètres dans l‘url ne respectent pas le schema de validation' });
		},
	})(schemas, handler);
}
