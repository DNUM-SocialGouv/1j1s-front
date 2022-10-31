import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { JobÉtudiantFiltre } from '~/server/jobs-étudiants/domain/jobÉtudiant';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { RésultatsRechercheOffre } from '~/server/offres/domain/offre';
import { mapLocalisation, toArray } from '~/server/offres/infra/controller/offreFiltre.mapper';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export async function rechercherJobÉtudiantHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffre | ErrorHttpResponse>) {
  const résultatsRechercheJobÉtudiant = await dependencies.offreJobÉtudiantDependencies.rechercherOffreJobÉtudiant.handle(jobÉtudiantFiltreMapper(req));
  return handleResponse(résultatsRechercheJobÉtudiant, res);
}

export default monitoringHandler(rechercherJobÉtudiantHandler);

export function jobÉtudiantFiltreMapper(request: NextApiRequest): JobÉtudiantFiltre {
  const { query } = request;

  return {
    grandDomaineList: query.grandDomaine ? toArray(query.grandDomaine) : undefined,
    localisation: mapLocalisation(query),
    motClé: query.motCle ? String(query.motCle) : '',
    page: Number(query.page),
  };
}
