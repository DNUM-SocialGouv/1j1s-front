import type { NextApiRequest, NextApiResponse } from "next";

import { monitoringHandler } from "~/server/monitoringHandler.middleware";
import { OffreEmploi } from "~/server/offresEmploi/domain/offreEmploi";
import { dependencies } from "~/server/start";

const handler = (req: NextApiRequest, res: NextApiResponse<OffreEmploi[]>) => {
  dependencies.offreEmploiDependencies.listeOffreEmploi
    .handle()
    .then((value) => {
      res.status(200).json(value);
    });
};
export default monitoringHandler(handler);
