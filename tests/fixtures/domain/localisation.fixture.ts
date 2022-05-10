import { Localisation } from '~/server/localisations/domain/localisation';

export function aCommuneList(): Localisation[] {
  return [
    {
      codeInsee: '34001',
      libelle: 'Abeilhan',
    },
    {
      codeInsee: '34002',
      libelle: 'Adissan',
    },
  ];
}

export function aDépartementList(): Localisation[] {
  return [
    {
      codeInsee: '34',
      libelle: 'Hérault',
    },
  ];
}

export function aRégionList(): Localisation[] {
  return [
    {
      codeInsee: '76',
      libelle: 'Occitanie',
    },
  ];
}
