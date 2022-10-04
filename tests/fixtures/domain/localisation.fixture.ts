import { Localisation, RechercheLocalisation } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import {
  CommuneLocalisationApiResponse,
  LocalisationApiResponse,
  RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

export function aLocalisationRepository(): LocalisationRepository {
  return {
    getCommuneListByCodePostal: jest.fn(),
    getCommuneListByNom: jest.fn(),
    getCommuneListByNuméroDépartement: jest.fn(),
    getDépartementListByNom: jest.fn(),
    getDépartementListByNuméroDépartement: jest.fn(),
    getRégionListByNom: jest.fn(),
  };
}

export function aCommune(override?: Partial<Localisation>): Localisation {
  return {
    code: '34290',
    nom: 'Abeilhan',
    ...override,
  };
}

export function aCommuneApiResponse(override?: Partial<CommuneLocalisationApiResponse>): CommuneLocalisationApiResponse {
  return {
    code: '34299',
    codePostal: '34290',
    libelle: 'Abeilhan (34290)',
    nom: 'Abeilhan',
    ...override,
  };
}

export function aCommuneList(): Localisation[] {
  return [
    aCommune(),
    aCommune({
      code: '34230',
      nom: 'Adissan',
    }),
  ];
}

export function aCommuneListApiResponse(): CommuneLocalisationApiResponse[] {
  return [
    aCommuneApiResponse(),
    aCommuneApiResponse({
      code: '34233',
      codePostal: '34230',
      libelle: 'Adissan (34230)',
      nom: 'Adissan',
    }),
  ];
}

export function aDépartement(): Localisation {
  return {
    code: '34',
    nom: 'Hérault',
  };
}

export function aDépartementApiResponse(): LocalisationApiResponse {
  return {
    code: '34',
    libelle: 'Hérault (34)',
    nom: 'Hérault',
  };
}

export function aDépartementList(): Localisation[] {
  return [
    aDépartement(),
  ];
}

export function aDépartementListApiResponse(): LocalisationApiResponse[] {
  return [
    aDépartementApiResponse(),
  ];
}

export function aRégion(): Localisation {
  return {
    code: '76',
    nom: 'Occitanie',
  };
}

export function aRégionApiResponse(): LocalisationApiResponse {
  return {
    code: '76',
    libelle: 'Occitanie (76)',
    nom: 'Occitanie',
  };
}

export function aRégionList(): Localisation[] {
  return [
    aRégion(),
  ];
}

export function aLongList(): RechercheLocalisation {
  return {
    communeList: [...Array(21)].map(() => {
      return { code: '76', codePostal: '76', coordonnées: { latitude: 2, longitude: 1 }, libelle: 'fake (76)', ville: 'fake' };
    }),
    départementList: [...Array(22)].map(() => {
      return { code: '76', nom: 'fake' };
    }),
    régionList: [...Array(22)].map(() => {
      return { code: '76', nom: 'fake' };
    }),
  };
}

export function aLocalisationList(): RechercheLocalisationApiResponse {
  return {
    communeList: [],
    départementList: [{ code: '75', libelle: 'Paris (75)', nom: 'Paris' }],
    régionList: [],
  };
}

export function aLocalisationListWithCommuneAndDépartement(): RechercheLocalisationApiResponse {
  return {
    communeList: [{ code: '75101', codePostal: '75001', libelle: 'Paris (75001)', nom: 'Paris' }],
    départementList: [{ code: '75', libelle: 'Paris (75)', nom: 'Paris' }],
    régionList: [],
  };
}

export function aLocalisationListWithEmptyValue(): RechercheLocalisationApiResponse {
  return {
    communeList: [],
    départementList: [],
    régionList: [],
  };
}
