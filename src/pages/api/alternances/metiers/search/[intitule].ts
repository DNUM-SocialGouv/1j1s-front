import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

import { MetierRecherche } from "~/server/alternances/domain/metierRecherche";
import { dependencies } from "~/server/start";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<MetierRecherche[]>
) => {
  const { intitule } = req.query;
  dependencies.metierRechercheDependencies.listeMetierRecherche
    .handle(intitule[0])
    .then((value) => {
      res.status(200).json(value);
    });
};

export default withSentry(handler);
