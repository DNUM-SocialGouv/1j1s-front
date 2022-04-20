import type { NextApiRequest, NextApiResponse } from "next";

import { OffreEmploi } from "../../server/offreemplois/domain/offreEmploi";
import { dependencies } from "../../server/start";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OffreEmploi[]>
) {
  dependencies.jobEtudiantDependencies.listeJobEtudiant
    .handle()
    .then((value) => {
      res.status(200).json(value);
    });
}
