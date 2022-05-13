import { Localisation, LocalisationList } from '~/server/localisations/domain/localisation';

export function aCommuneList(): Localisation[] {
  return [
    {
      code: '34290',
      codeInsee: '34001',
      libelle: 'Abeilhan',
    },
    {
      code: '34230',
      codeInsee: '34002',
      libelle: 'Adissan',
    },
  ];
}

export function aDépartementList(): Localisation[] {
  return [
    {
      code: '34',
      codeInsee: '34',
      libelle: 'Hérault',
    },
  ];
}

export function aRégionList(): Localisation[] {
  return [
    {
      code: '76',
      codeInsee: '76',
      libelle: 'Occitanie',
    },
  ];
}

export function aLongList(): LocalisationList {
  return {
    communeList: [...Array(22)].map(() => {
      return { code: '76', codeInsee: 'fale', libelle:'ff' };
    }),
    départementList: [...Array(22)].map(() => {
      return { code: '76', codeInsee: 'fale', libelle:'ff' };
    }),
    régionList: [...Array(22)].map(() => {
      return { code: '76', codeInsee: 'fale', libelle:'ff' };
    }),
  };
}

export function aLocalisationList(): LocalisationList {
  return {
    communeList: [],
    départementList: [{ code: '75', codeInsee: '75', libelle:'Paris' }],
    régionList: [],
  };
}
