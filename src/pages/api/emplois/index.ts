import type { NextApiRequest, NextApiResponse } from 'next';

import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import {
  OffreEmploiFiltre,
  OffreEmploiFiltreLocalisation,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';

export async function rechercherOffreEmploiHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffreEmploi>) {
  const résultatsRechercheOffreEmploi = await dependencies.offreEmploiDependencies.rechercherOffreEmploi
    .handle(offreEmploiRequestMapper(req));
  return res.status(200).json(résultatsRechercheOffreEmploi);
}

export default monitoringHandler(rechercherOffreEmploiHandler);

function offreEmploiRequestMapper(request: NextApiRequest): OffreEmploiFiltre {
  const { query } = request;

  return {
    localisation: localisationMapper(query),
    motClé: query.motCle ? String(query.motCle) : '',
    page: Number(query.page),
    typeDeContrats: query.typeDeContrats ? toTypeDeContrats(query.typeDeContrats) : [],
  };

  function localisationMapper(query: { [key: string]: string | string[]; }): OffreEmploiFiltreLocalisation | undefined {
    const { codeInsee, typeLocalisation } = query;
    if(typeLocalisation === TypeLocalisation.REGION) {
      return {
        codeInsee: String(codeInsee),
        typeLocalisation: TypeLocalisation.REGION,
      };
    } else if(typeLocalisation === TypeLocalisation.DEPARTEMENT) {
      return {
        codeInsee: String(codeInsee),
        typeLocalisation: TypeLocalisation.DEPARTEMENT,
      };
    } else if(typeLocalisation === TypeLocalisation.COMMUNE) {
      return {
        codeInsee: String(codeInsee),
        typeLocalisation: TypeLocalisation.COMMUNE,
      };
    } else {
      return undefined;
    }
  }
}

function toTypeDeContrats(typeDeContrats: string | string[]): string[] {
  return typeDeContrats.toString().split(',');
}
