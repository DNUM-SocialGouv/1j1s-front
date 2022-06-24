import { useRouter } from 'next/router';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface OffreEmploiQueryParams {
  motCle: string | undefined
  typeDeContrats: string | undefined
  typeLocalisation: string | undefined
  codeLocalisation: string | undefined
  libelleLocalisation: string | undefined
  tempsDeTravail: string | undefined
  experienceExigence: string | undefined
  grandDomaine: string | undefined
}

export function useOffreEmploiQuery(): OffreEmploiQueryParams {
  const { query } = useRouter();

  return {
    codeLocalisation: getSingleQueryParam(query.codeLocalisation),
    experienceExigence: getSingleQueryParam(query.experienceExigence),
    grandDomaine: getSingleQueryParam(query.grandDomaine),
    libelleLocalisation: getSingleQueryParam(query.libelleLocalisation),
    motCle: getSingleQueryParam(query.motCle),
    tempsDeTravail: getSingleQueryParam(query.tempsDeTravail),
    typeDeContrats: getSingleQueryParam(query.typeDeContrats),
    typeLocalisation: getSingleQueryParam(query.typeLocalisation),
  };
}
