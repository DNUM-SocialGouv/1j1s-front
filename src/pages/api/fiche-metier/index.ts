import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { FicheMetierFiltresRecherche, FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

const DEFAULT_NUMBER_OF_RESULT = 15;

export async function rechercherFicheMetierHandler(req: NextApiRequest, res: NextApiResponse<FicheMétierResult | ErrorHttpResponse>) {
  const resultat = await dependencies.fichesMetierDependencies.rechercherFicheMetier.handle(mapQuery(req));
  return handleResponse(resultat, res);
}

export default monitoringHandler(rechercherFicheMetierHandler);

function mapQuery(req: NextApiRequest): FicheMetierFiltresRecherche {
  const { query } = req;
  return {
    motCle: query.motCle?.toString() || '',
    numberOfResult: DEFAULT_NUMBER_OF_RESULT,
    page: Number(query.page),
  };
}
