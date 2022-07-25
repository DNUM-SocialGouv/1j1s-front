import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import {
  OffreEmploiFiltre,
  OffreEmploiFiltreLocalisation,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/apiResponse.util';

export async function rechercherOffreEmploiHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffreEmploi | ErrorHttpResponse>) {
  const résultatsRechercheOffreEmploi = await dependencies.offreEmploiDependencies.rechercherOffreEmploi
    .handle(offreEmploiRequestMapper(req));
  return handleResponse(résultatsRechercheOffreEmploi, res);
}

export default monitoringHandler(rechercherOffreEmploiHandler);

function offreEmploiRequestMapper(request: NextApiRequest): OffreEmploiFiltre {
  const { query } = request;

  return {
    dureeHebdoMax: query.dureeHebdoMax ? String(query.dureeHebdoMax) : '',
    experienceExigence: query.experienceExigence ? String(query.experienceExigence) : '',
    grandDomaineList: query.grandDomaine ? toArray(query.grandDomaine) : [],
    localisation: mapLocalisation(query),
    motClé: query.motCle ? String(query.motCle) : '',
    page: Number(query.page),
    tempsDeTravail: query.tempsDeTravail ? String(query.tempsDeTravail) : '',
    typeDeContratList: query.typeDeContrats ? toArray(query.typeDeContrats) : [],
  };
}

function mapLocalisation(query: { [key: string]: string | string[] | undefined }): OffreEmploiFiltreLocalisation | undefined {
  const { codeLocalisation, typeLocalisation } = query;
  return (typeLocalisation as TypeLocalisation in TypeLocalisation)
    ? {
      code: String(codeLocalisation),
      type: typeLocalisation as TypeLocalisation,
    }
    : undefined;
}

function toArray(query: string | string[]): string[] {
  return query.toString().split(',');
}
