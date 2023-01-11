import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';

import { createFailure } from '~/server/errors/either';
import { ErreurTechnique } from '~/server/errors/erreurTechnique.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';
import { handleResponse } from '~/server/utils/handleResponse.util';

const SCALINGO_FORWARD_IP_HEADER = 'x-forwarded-for';

export const getIP = (request: NextApiRequest): string => {
	if (request.headers[SCALINGO_FORWARD_IP_HEADER] !== undefined) {
		return request.headers['x-forwarded-for']?.toString();
	}
	return request.socket.remoteAddress || '';
};

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

export async function applyRateLimit(request: NextApiRequest, response: NextApiResponse, middleware = rateLimitMiddleware): Promise<boolean> {
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
