import { FicheMétier, FicheMétierResult } from '~/server/fiche-metier/domain/ficheMetier';

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
