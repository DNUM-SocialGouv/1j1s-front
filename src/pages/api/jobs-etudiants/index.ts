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

export async function rechercherJobÉtudiantHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffreEmploi | ErrorHttpResponse>) {
  const résultatsRechercheJobÉtudiant = await dependencies.offreEmploiDependencies.rechercherOffreEmploi
    .handle(jobÉtudiantRequestMapper(req));
  switch (résultatsRechercheJobÉtudiant.instance) {
    case 'success':
      return res.status(200).json(résultatsRechercheJobÉtudiant.result);
    case 'failure':
      switch(résultatsRechercheJobÉtudiant.errorType) {
        case ErrorType.SERVICE_INDISPONIBLE:
          return res.status(500).json({ error: résultatsRechercheJobÉtudiant.errorType });
        case ErrorType.DEMANDE_INCORRECTE:
          return res.status(400).json({ error: résultatsRechercheJobÉtudiant.errorType });
        case ErrorType.ERREUR_INATTENDUE:
          return res.status(503).json({ error: résultatsRechercheJobÉtudiant.errorType });
      }
  }
}

export default monitoringHandler(rechercherJobÉtudiantHandler);

function jobÉtudiantRequestMapper(request: NextApiRequest): OffreEmploiFiltre {
  const { query } = request;

  return {
    dureeHebdoMax: '1600',
    experienceExigence: '',
    grandDomaineList: query.grandDomaine ? toArray(query.grandDomaine) : [],
    localisation: mapLocalisation(query),
    motClé: query.motCle ? String(query.motCle) : '',
    page: Number(query.page),
    tempsDeTravail: 'tempsPartiel',
    typeDeContratList: ['CDD', 'MIS', 'SAI'],
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
