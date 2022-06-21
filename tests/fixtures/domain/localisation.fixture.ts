import { Localisation, LocalisationList } from '~/server/localisations/domain/localisation';
import { LocalisationRepository } from '~/server/localisations/domain/localisation.repository';
import { LocalisationApiResponse } from '~/server/localisations/infra/controllers/LocalisationListApiResponse';

export function aLocalisationRepository(): LocalisationRepository {
  return {
    getAdresseList: jest.fn(),
    getCommuneListByCodePostal: jest.fn(),
    getCommuneListByNom: jest.fn(),
    getCommuneListByNuméroDépartement: jest.fn(),
    getDépartementListByNom: jest.fn(),
    getDépartementListByNuméroDépartement : jest.fn(),
    getLocalisationByTypeLocalisationAndCodeInsee: jest.fn(),
    getRégionListByNom: jest.fn(),
  };
}

export function aCommune(override?: Partial<Localisation>): Localisation {
  return {
    code: '34290',
    libelle: 'Abeilhan',
    ...override,
  };
}

export function aCommuneApiResponse(override?: Partial<LocalisationApiResponse>): LocalisationApiResponse {
  return {
    code: '34290',
    libelle: 'Abeilhan',
    ...override,
  };
}

export function aCommuneList(): Localisation[] {
  return [
    aCommune(),
    aCommune({
      code: '34230',
      libelle: 'Adissan',
    }),
  ];
}

export function aCommuneListApiResponse(): LocalisationApiResponse[] {
  return [
    aCommuneApiResponse(),
    aCommuneApiResponse({
      code: '34230',
      libelle: 'Adissan',
    }),
  ];
}

export function aDépartement(): Localisation {
  return {
    code: '34',
    libelle: 'Hérault',
  };
}

export function aDépartementApiResponse(): LocalisationApiResponse {
  return {
    code: '34',
    libelle: 'Hérault',
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
    libelle: 'Occitanie',
  };
}

export function aRégionApiResponse(): LocalisationApiResponse {
  return {
    code: '76',
    libelle: 'Occitanie',
  };
}

export function aRégionList(): Localisation[] {
  return [
    aRégion(),
  ];
}

export function aLongList(): LocalisationList {
  return {
    communeList: [...Array(22)].map(() => {
      return { code: '76', libelle:'fake' };
    }),
    départementList: [...Array(22)].map(() => {
      return { code: '76', libelle:'fake' };
    }),
    régionList: [...Array(22)].map(() => {
      return { code: '76', libelle:'fake' };
    }),
  };
}

export function aLocalisationList(): LocalisationList {
  return {
    communeList: [],
    départementList: [{ code: '75', libelle:'Paris' }],
    régionList: [],
  };
}

export function aLocalisationListWithCommuneAndDépartement(): LocalisationList {
  return {
    communeList: [{ code: '75001', libelle:'Paris' }],
    départementList: [{ code: '75', libelle:'Paris' }],
    régionList: [],
  };
}

export function aLocalisationListWithEmptyValue(): LocalisationList {
  return {
    communeList: [],
    départementList: [],
    régionList: [],
  };
}
