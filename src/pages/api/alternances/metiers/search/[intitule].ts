import { NextApiRequest, NextApiResponse } from "next";

import { MetierRecherche } from "../../../../../server/alternances/domain/MetierRecherche";
import { dependencies } from "../../../../../server/start";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MetierRecherche[]>
) {
  const { intitule } = req.query;
  dependencies.metierRechercheDependencies.listeMetierRecherche
    .handle(intitule[0])
    .then((value) => {
      res.status(200).json(value);
    });
}
