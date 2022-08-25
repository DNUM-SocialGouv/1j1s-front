import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { FicheMetierFiltresRecherche, FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';

export async function rechercherFicheMetierHandler(req: NextApiRequest, res: NextApiResponse<FicheMétierResult | ErrorHttpResponse>) {
  const resultat = await dependencies.fichesMetierDependencies.rechercherFicheMetier.handle(mapQuery(req));
  if (resultat.instance === 'success') {
    return res.status(200).json(resultat.result);
  }
}

export default monitoringHandler(rechercherFicheMetierHandler);

function mapQuery(req: NextApiRequest): FicheMetierFiltresRecherche {
  const { query } = req;
  return {
    motCle: query.motCle?.toString() || '',
  };
}
