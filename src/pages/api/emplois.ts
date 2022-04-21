import * as Sentry from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { OffreEmploi } from "../../server/offreemplois/domain/offreEmploi";
import { dependencies } from "../../server/start";

const handler = (req: NextApiRequest, res: NextApiResponse<OffreEmploi[]>) => {
  const transactionId = req.headers["x-transaction-id"];

  if (transactionId) {
    Sentry.configureScope((scope) => {
      scope.setTag("transaction_id", transactionId);
    });
  }

  dependencies.offreEmploiDependencies.listeOffreEmploi
    .handle()
    .then((value) => {
      res.status(200).json(value);
    });
};

export default Sentry.withSentry(handler);
