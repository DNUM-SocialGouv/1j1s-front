import type { NextApiRequest, NextApiResponse } from "next";

import { OffreEmploi } from "../../server/offreemplois/domain/OffreEmploi";
import { dependencies } from "../../server/start";

export default function handlerEmplois(
  req: NextApiRequest,
  res: NextApiResponse<OffreEmploi[]>
) {
  dependencies.offreEmploiDependencies.listeOffreEmploi
    .handle()
    .then((value) => {
      res.status(200).json(value);
    });
}
