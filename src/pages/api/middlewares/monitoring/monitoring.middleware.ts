import { configureScope } from '@sentry/nextjs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export function withMonitoring(handler: NextApiHandler): NextApiHandler {
	return function (req: NextApiRequest, res: NextApiResponse) {
		const transactionId = req.headers['x-transaction-id'] as string;
		const sessionId = req.headers['x-session-id'] as string;

		configureScope((scope) => {
			scope.setTag('transaction_id', transactionId);
			scope.setTag('session_id', sessionId);
		});

		return handler(req, res);
	};
}
