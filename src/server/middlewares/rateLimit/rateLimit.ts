import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';

import { createFailure } from '../../errors/either';
import { ErreurTechnique } from '../../errors/erreurTechnique.types';
import { SentryException } from '../../exceptions/sentryException';
import { LoggerService } from '../../services/logger.service';
import { handleResponse } from '../../utils/handleResponse.util';

export const getIP = (request: NextApiRequest) => request.socket.remoteAddress || '';

export function onErrorHandler(request: NextApiRequest, response: NextApiResponse) {
	handleResponse(createFailure(ErreurTechnique.TOO_MANY_REQUESTS), response);
	LoggerService.errorWithExtra(new SentryException(
		'[RATE LIMIT] requête bloquée',
		{ context: `requête: ${request.url}`, source: 'BFF' },
		{},
	));
}

const rateLimitMiddleware = rateLimit({
	handler: onErrorHandler,
	keyGenerator: getIP,
	max: Number(process.env.RATE_LIMIT_REQUESTS_NUMBER),
	windowMs: Number(process.env.RATE_LIMIT_PERIOD_IN_SECONDS) * 1000,
});

export async function applyRateLimit(request: NextApiRequest, response: NextApiResponse, middleware = rateLimitMiddleware) {
	await new Promise((resolve, reject) => {
		middleware(request, response, (result: unknown) => {
			if (result instanceof Error) {
				reject(result);
			}
			resolve(result);
		});
	});
	return response.statusCode === 429;
}
