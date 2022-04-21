import type { NextApiRequest, NextApiResponse } from "next";

import { OffreEmploi } from "../../server/offreemplois/domain/offreEmploi";
import { sentryHandler } from "../../server/sentryHandler.middleware";
import { dependencies } from "../../server/start";

const handler = (req: NextApiRequest, res: NextApiResponse<OffreEmploi[]>) => {
  dependencies.offreEmploiDependencies.listeOffreEmploi
    .handle()
    .then((value) => {
      res.status(200).json(value);
    })
};
export default sentryHandler(handler);
