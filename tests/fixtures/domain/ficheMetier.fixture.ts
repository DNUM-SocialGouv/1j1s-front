// eslint-disable-next-line import/named
import { SearchResponse } from 'meilisearch';

import { FicheMétier, FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMétierHttp } from '~/server/fiche-metier/infra/repositories/ficheMetierMeilisearch.response';

export function aFicheMetier(override?: Partial<FicheMétier>) {
  return {
    accesMetier: 'string',
    accrocheMetier: 'string',
    centresInteret: [],
    competences: 'string',
    conditionTravail: 'string',
    formationsMinRequise: [],
    id: 'string',
    idOnisep: 'string',
    natureTravail: 'string',
    niveauMinAcces: [],
    nomMetier: 'string',
    secteursActivite: [],
    statuts: [],
    vieProfessionnelle: 'string',
    ...override,
  };
}

export function aFicheMetierResult(override?: Partial<FicheMétierResult>) {
  return {
    estimatedTotalResults: 1,
    limit: 1,
    offset: 0,
    processingTimeMs: 2,
    results: [aFicheMetier()],
    ...override,
  };
}

export function aFicheMetierResultWithPagination(override?: Partial<FicheMétierResult>) {
  return {
    estimatedTotalResults: 4,
    limit: 2,
    offset: 0,
    processingTimeMs: 2,
    results: [aFicheMetier({ id: '1' }), aFicheMetier({ id: '2' })],
    ...override,
  };
}

export function aFicheMetierHttp(override?: Partial<FicheMétierHttp>): Partial<FicheMétierHttp> {
  return {
    acces_metier: 'string',
    accroche_metier: 'string',
    centres_interet: [],
    competences: 'string',
    condition_travail: 'string',
    formations_min_requise: [],
    id: 'string',
    identifiant: 'string',
    nature_travail: 'string',
    niveau_min_acces: [],
    nom_metier: 'string',
    secteurs_activite: [],
    statuts: [],
    vie_professionnelle: 'string',
    ...override,
  };
}

export function aFicheMetierResultHttp(override?: SearchResponse<Partial<FicheMétierHttp>>): SearchResponse<Partial<FicheMétierHttp>> {
  return {
    estimatedTotalHits: 1,
    hits: [aFicheMetierHttp()],
    limit: 1,
    offset: 0,
    processingTimeMs: 2,
    query: 'string',
    ...override,
  };
}
