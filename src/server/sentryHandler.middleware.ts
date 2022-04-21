import { configureScope, withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export const sentryHandler =
  (fn) => (req: NextApiRequest, res: NextApiResponse) => {
    const transactionId = req.headers["x-transaction-id"] as string;
    const sessionId = req.headers["x-session-id"] as string;

    configureScope((scope) => {
      scope.setTag("transaction_id", transactionId);
      scope.setTag("session_id", sessionId);
    });

    return withSentry(fn(req, res));
  };
