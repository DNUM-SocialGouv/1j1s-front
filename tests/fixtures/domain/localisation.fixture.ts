import { Localisation } from '~/server/localisations/domain/localisation';

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
