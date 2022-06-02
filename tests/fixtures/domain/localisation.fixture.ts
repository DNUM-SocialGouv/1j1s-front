import { CodeInsee } from '~/server/localisations/domain/codeInsee';
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
    codeInsee: CodeInsee.createCodeInsee('34001'),
    libelle: 'Abeilhan',
    ...override,
  };
}

export function aCommuneApiResponse(override?: Partial<LocalisationApiResponse>): LocalisationApiResponse {
  return {
    code: '34290',
    codeInsee: '34001',
    libelle: 'Abeilhan',
    ...override,
  };
}

export function aCommuneList(): Localisation[] {
  return [
    aCommune(),
    aCommune({
      code: '34230',
      codeInsee: CodeInsee.createCodeInsee('34002'),
      libelle: 'Adissan',
    }),
  ];
}

export function aCommuneListApiResponse(): LocalisationApiResponse[] {
  return [
    aCommuneApiResponse(),
    aCommuneApiResponse({
      code: '34230',
      codeInsee: '34002',
      libelle: 'Adissan',
    }),
  ];
}

export function aDépartement(): Localisation {
  return {
    code: '34',
    codeInsee: CodeInsee.createCodeInsee('34'),
    libelle: 'Hérault',
  };
}

export function aDépartementApiResponse(): LocalisationApiResponse {
  return {
    code: '34',
    codeInsee: '34',
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
    codeInsee: CodeInsee.createCodeInsee('76'),
    libelle: 'Occitanie',
  };
}

export function aRégionApiResponse(): LocalisationApiResponse {
  return {
    code: '76',
    codeInsee: '76',
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
      return { code: '76', codeInsee: CodeInsee.createCodeInsee('fale'), libelle:'ff' };
    }),
    départementList: [...Array(22)].map(() => {
      return { code: '76', codeInsee: CodeInsee.createCodeInsee('fale'), libelle:'ff' };
    }),
    régionList: [...Array(22)].map(() => {
      return { code: '76', codeInsee: CodeInsee.createCodeInsee('fale'), libelle:'ff' };
    }),
  };
}

export function aLocalisationList(): LocalisationList {
  return {
    communeList: [],
    départementList: [{ code: '75', codeInsee: CodeInsee.createCodeInsee('75'), libelle:'Paris' }],
    régionList: [],
  };
}

export function aLocalisationListWithCommuneAndDépartement(): LocalisationList {
  return {
    communeList: [{ code: '75056', codeInsee: CodeInsee.createCodeInsee('75001_75056'), libelle:'Paris' }],
    départementList: [{ code: '75', codeInsee: CodeInsee.createCodeInsee('75'), libelle:'Paris' }],
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
