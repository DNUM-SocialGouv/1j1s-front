import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getSingleQueryParam } from '~/client/utils/queryParams.utils';

interface OffreEmploiQueryParams {
  motCle?: string
  typeDeContrats?: string
  typeLocalisation?: string
  codeLocalisation?: string
  libelleLocalisation?: string
  tempsDeTravail?: string
  experienceExigence?: string
  grandDomaine?: string
}

export function useOffreEmploiQuery(): OffreEmploiQueryParams {
  const [offreEmploiQueryParams, setOffreEmploiQueryParams] = useState<OffreEmploiQueryParams>({
    codeLocalisation: undefined,
    experienceExigence: undefined,
    grandDomaine: undefined,
    libelleLocalisation: undefined,
    motCle: undefined,
    tempsDeTravail: undefined,
    typeDeContrats: undefined,
    typeLocalisation: undefined,
  });

  const { query } = useRouter();

  useEffect(() => {
    setOffreEmploiQueryParams({
      codeLocalisation: getSingleQueryParam(query.codeLocalisation),
      experienceExigence: getSingleQueryParam(query.experienceExigence),
      grandDomaine: getSingleQueryParam(query.grandDomaine),
      libelleLocalisation: getSingleQueryParam(query.libelleLocalisation),
      motCle: getSingleQueryParam(query.motCle),
      tempsDeTravail: getSingleQueryParam(query.tempsDeTravail),
      typeDeContrats: getSingleQueryParam(query.typeDeContrats),
      typeLocalisation: getSingleQueryParam(query.typeLocalisation),
    });
  }, [query]);

  return offreEmploiQueryParams;
}
