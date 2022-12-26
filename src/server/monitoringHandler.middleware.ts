import { configureScope, withSentry } from '@sentry/nextjs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function monitoringHandler(handler: any) {
  return function (req: NextApiRequest, res: NextApiResponse): NextApiHandler {
    const transactionId = req.headers['x-transaction-id'] as string;
    const sessionId = req.headers['x-session-id'] as string;

    configureScope((scope) => {
      scope.setTag('transaction_id', transactionId);
      scope.setTag('session_id', sessionId);
    });

    if (process.env.NODE_ENV === 'production') {
      return withSentry(handler(req, res));
    } else {
      return handler(req, res);
    }
  };
}
