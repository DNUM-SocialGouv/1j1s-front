import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorType } from '~/server/errors/error.types';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import {
  OffreEmploiFiltre,
  OffreEmploiFiltreLocalisation,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';

export async function rechercherOffreEmploiHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffreEmploi | ErrorHttpResponse>) {
  const résultatsRechercheOffreEmploi = await dependencies.offreEmploiDependencies.rechercherOffreEmploi
    .handle(offreEmploiRequestMapper(req));
  switch (résultatsRechercheOffreEmploi.instance) {
    case 'success':
      return res.status(200).json(résultatsRechercheOffreEmploi.result);
    case 'failure':
      switch(résultatsRechercheOffreEmploi.errorType) {
        case ErrorType.SERVICE_INDISPONIBLE:
          return res.status(500).json({ error: résultatsRechercheOffreEmploi.errorType });
        case ErrorType.DEMANDE_INCORRECTE:
          return res.status(400).json({ error: résultatsRechercheOffreEmploi.errorType });
        case ErrorType.ERREUR_INATTENDUE:
          return res.status(503).json({ error: résultatsRechercheOffreEmploi.errorType });
      }
  }
}

export default monitoringHandler(rechercherOffreEmploiHandler);

function offreEmploiRequestMapper(request: NextApiRequest): OffreEmploiFiltre {
  const { query } = request;

  return {
    experienceExigence: query.experienceExigence ? toArray(query.experienceExigence) : [],
    grandDomaine: query.grandDomaine ? toArray(query.grandDomaine) : [],
    localisation: localisationMapper(query),
    motClé: query.motCle ? String(query.motCle) : '',
    page: Number(query.page),
    tempsPlein: query.tempsPlein ? String(query.tempsPlein) : '',
    typeDeContrats: query.typeDeContrats ? toArray(query.typeDeContrats) : [],
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

function toArray(query: string | string[]): string[] {
  return query.toString().split(',');
}
