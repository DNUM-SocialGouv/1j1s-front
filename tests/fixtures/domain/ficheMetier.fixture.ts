// eslint-disable-next-line import/named
import { SearchResponse } from 'meilisearch';

import { FicheMétier, FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';
import { FicheMétierHttp } from '~/server/fiche-metier/domain/ficheMetierHttp';

export function aFicheMetier(override?: Partial<FicheMétier>) {
  return {
    accesMetier: 'string',
    accrocheMetier: 'string',
    centresInteret: [
      {
        id: 1,
        idOnisep: 'string',
        libelle: 'string',
      },
    ],
    competences: 'string',
    conditionTravail: 'string',
    formationsMinRequise: [
      {
        id: 1,
        idOnisep: 'string',
        libelle: 'string',
      },
    ],
    id: 'string',
    idOnisep: 'string',
    natureTravail: 'string',
    niveauAccesMin: [
      {
        id: 1,
        idOnisep: 'string',
        libelle: 'string',
      },
    ],
    nomMetier: 'string',
    secteursActivite: [
      {
        id: 1,
        idOnisep: 'string',
        libelle: 'string',
      },
    ],
    statuts: [
      {
        id: 1,
        idIdeo: 'string',
        idOnisep: 'string',
        libelle: 'string',
      },
    ],
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
    centres_interet: [
      {
        id: 1,
        identifiant: 'string',
        libelle: 'string',
      },
    ],
    competences: 'string',
    condition_travail: 'string',
    formations_min_requise: [
      {
        id: 1,
        identifiant: 'string',
        libelle: 'string',
      },
    ],
    id: 'string',
    identifiant: 'string',
    nature_travail: 'string',
    niveau_acces_min: [
      {
        id: 1,
        identifiant: 'string',
        libelle: 'string',
      },
    ],
    nom_metier: 'string',
    secteurs_activite: [
      {
        id: 1,
        identifiant: 'string',
        libelle: 'string',
      },
    ],
    statuts: [
      {
        id: 1,
        id_ideo1: 'string',
        identifiant: 'string',
        libelle: 'string',
      },
    ],
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
