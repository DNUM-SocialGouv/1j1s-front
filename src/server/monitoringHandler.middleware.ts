import { configureScope, withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export const monitoringHandler =
  (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
    const transactionId = req.headers["x-transaction-id"] as string;
    const sessionId = req.headers["x-session-id"] as string;

    configureScope((scope) => {
      scope.setTag("transaction_id", transactionId);
      scope.setTag("session_id", sessionId);
    });

    return withSentry(handler(req, res));
  };
