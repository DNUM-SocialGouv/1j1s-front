import type { NextApiRequest, NextApiResponse } from "next";

import { monitoringHandler } from "~/server/monitoringHandler.middleware";
import {
  OffreEmploi,
  OffreEmploiFiltre,
} from "~/server/offresEmploi/domain/offreEmploi";
import { dependencies } from "~/server/start";

export const offreEmploiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<OffreEmploi[]>
) => {
  dependencies.offreEmploiDependencies.listeOffreEmploi
    .handle(offreEmploiRequestMapper(req))
    .then((value) => {
      res.status(200).json(value);
    });
};
export default monitoringHandler(offreEmploiHandler);

function offreEmploiRequestMapper(request: NextApiRequest): OffreEmploiFiltre {
  const { query } = request;

  return {
    motClé: String(query.motsCles),
    page: Number(query.page),
  };
}
