import { StrapiCollectionTypeResponse } from '../../cms/infra/repositories/strapi.response';
import { FicheMétier } from './ficheMetier';
import { FicheMétierHttp } from './ficheMetierHttp';

export function aFicheMetier(override?: Partial<FicheMétier>) {
  return {
    accesMetier: 'string',
    accrocheMetier: 'string',
    centresInteret: [
      {
        id: 1,
        idOnisep: 'string',
        libelle: 'String',
      },
    ],
    competences: 'string',
    conditionTravail: 'string',
    formationsMinRequise: [
      {
        id: 1,
        idOnisep: 'string',
        libelle: 'String',
      },
    ],
    id: 'string',
    idOnisep: 'string',
    natureTravail: 'string',
    niveauAccesMin: [
      {
        id: 1,
        idOnisep: 'string',
        libelle: 'String',
      },
    ],
    nomMetier: 'string',
    secteursActivite: [
      {
        id: 1,
        idOnisep: 'string',
        libelle: 'String',
      },
    ],
    statuts: [
      {
        id: 1,
        idIdeo: 'string',
        idOnisep: 'string',
        libelle: 'String',
      },
    ],
    vieProfessionnelle: 'string',
    ...override,
  };
}

export function aStrapiFicheMetier(override?: Partial<FicheMétierHttp>): Partial<StrapiCollectionTypeResponse<FicheMétierHttp>> {
  return { 
    data: [{
      attributes: {
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
      },
    }],
  };
}
