import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';

import { createFailure } from '~/server/errors/either';
import { ErreurTechnique } from '~/server/errors/erreurTechnique.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { LoggerService } from '~/server/services/logger.service';
import { handleResponse } from '~/server/utils/handleResponse.util';

const CLIENT_IP_DEFAULT_HEADER_KEY = 'x-forwarded-for';
const CLIENT_IP_HEADER_KEY = process.env.RATE_LIMIT_CLIENT_IP_HEADER_KEY || CLIENT_IP_DEFAULT_HEADER_KEY;

export const getIP = (request: NextApiRequest): string => {
	const clientIp = request.headers[CLIENT_IP_HEADER_KEY];
	if (clientIp) {
		return clientIp.toString();
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
