import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import {
  OffreEmploiFiltreLocalisation,
  OffreFiltre,
  RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export async function rechercherJobÉtudiantHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheOffreEmploi | ErrorHttpResponse>) {
  const résultatsRechercheJobÉtudiant = await dependencies.offreEmploiDependencies.rechercherOffreEmploi
    .handle(jobÉtudiantRequestMapper(req));
  return handleResponse(résultatsRechercheJobÉtudiant, res);
}

export default monitoringHandler(rechercherJobÉtudiantHandler);

function jobÉtudiantRequestMapper(request: NextApiRequest): OffreFiltre {
  const { query } = request;
  const isEchantillonJobEtudiant = Object.keys(query).length === 1 && Object.keys(query).includes('page');
  if (isEchantillonJobEtudiant) {
    return {
      dureeHebdoMax: '1600',
      page: Number(query.page),
      tempsDeTravail: 'tempsPartiel',
      typeDeContratList: ['CDD', 'MIS', 'SAI'],
    };
  }
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
