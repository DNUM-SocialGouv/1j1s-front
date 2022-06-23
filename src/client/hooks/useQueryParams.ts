import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import {
  useEffect,
  useState,
} from 'react';

export const enum QueryParams {
  MOT_CLÉ = 'motCle',
  TYPE_DE_CONTRATS = 'typeDeContrats',
  PAGE = 'page',
  TYPE_LOCALISATION = 'typeLocalisation',
  CODE_LOCALISATION = 'codeLocalisation',
  TEMPS_DE_TRAVAIL = 'tempsDeTravail',
  EXPÉRIENCE = 'experienceExigence',
  DOMAINE = 'grandDomaine',
  MÉTIER_SÉLECTIONNÉ = 'metierSelectionne',
  CODE_ROMES = 'codeRomes',
  RADIUS = 'radius'
}

export default function useQueryParams() {
  const router = useRouter();

  const [queryParams, setQueryParams] = useState<ParsedUrlQuery>({});

  const isKeyInQueryParams = (key: string): boolean => !!queryParams[key];

  const getQueryValue = (key: string): string => <string>queryParams[key];

  const getQueryString = (): string => new URLSearchParams(Object.entries(queryParams) as unknown as URLSearchParams).toString();

  useEffect(() => {
    setQueryParams(router.query);
  }, [setQueryParams, router.query]);

  return {
    getQueryString,
    getQueryValue,
    hasQueryParams: !!(queryParams && Object.keys(queryParams).length > 0),
    isKeyInQueryParams,
    queryParams,
  };
}
