import Joi from 'joi';

import { SentryException } from '~/server/exceptions/sentryException';
import { aLoggerService } from '~/server/services/logger.service.fixture';
import { validateApiResponse } from '~/server/utils/validateApiResponse';

describe('validateApiResponse', () => {
	describe('lorsque la réponse est valide', () => {
		it('ne fait rien', () => {
			// Given
			const schema = Joi.string().required();
			const data = 'abc';
			const logger = aLoggerService();

			// When
			validateApiResponse(schema as never, data, logger, 'api');

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

			// When
			validateApiResponse(schema as never, data, logger, 'api');

			// Then
			expect(logger.warnWithExtra).toHaveBeenCalledWith(
				new SentryException(
					'[api] Erreur de validation de la réponse de l’API',
					{ context: '', source: 'api' },
					{
						errorDetail: [
							{
								context: { key: undefined, label: 'value', value: 123 },
								message: '"value" must be a string',
								path: [],
								type: 'string.base',
							},
						],
					},
				),
			);
		});
	});
});
