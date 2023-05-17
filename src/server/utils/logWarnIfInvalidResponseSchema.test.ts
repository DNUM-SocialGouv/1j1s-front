import Joi from 'joi';

import { SentryException } from '~/server/exceptions/sentryException';
import { aLoggerService } from '~/server/services/logger.service.fixture';
import { logWarnIfInvalidResponseSchema } from '~/server/utils/logWarnIfInvalidResponseSchema';

describe('logWarnIfInvalidResponseSchema', () => {
	describe('lorsque la réponse est valide', () => {
		it('ne fait rien', () => {
			// Given
			const schema = Joi.string().required();
			const data = 'abc';
			const logger = aLoggerService();

			// When
			logWarnIfInvalidResponseSchema(logger, 'api', data, schema);

			// Then
			expect(logger.errorWithExtra).not.toHaveBeenCalled();
		});
	});

	describe('lorsque la réponse est invalide', () => {
		it('log le warn avec les bons paramètres', () => {
			// Given
			const schema = Joi.string().required();
			const data = 123;
			const logger = aLoggerService();
			const apiName = 'api';

			// When
			logWarnIfInvalidResponseSchema(logger, apiName, data, schema as never);

			// Then
			expect(logger.warnWithExtra).toHaveBeenCalledWith(
				new SentryException(
					`[${apiName}] Erreur de validation de la réponse de l’API`,
					{ context: '', source: apiName },
					{
						errorDetail: expect.any(Joi.ValidationError),
					},
				),
			);
		});
	});
});
