import rateLimit from 'express-rate-limit';

import { getIP, onErrorHandler } from '../rateLimit';

export const mailRateLimitMiddleware = rateLimit({
	handler: onErrorHandler,
	keyGenerator: getIP,
	max: Number(process.env.RATE_LIMIT_MAIL_REQUESTS_NUMBER),
	windowMs: Number(process.env.RATE_LIMIT_MAIL_PERIOD_IN_SECONDS) * 1000,
});
