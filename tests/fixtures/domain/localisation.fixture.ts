import { Localisation } from '~/server/localisations/domain/localisation';

export function aCommuneList(): Localisation[] {
  return [
    {
      codeInsee: '36048',
      libelle: 'Chavin',
    },
    {
      codeInsee: '92022',
      libelle: 'Chaville',
    },
  ];
}

export function aDépartementList(): Localisation[] {
  return [
    {
      codeInsee: '78',
      libelle: 'Yvelines',
    },
  ];
}

export function aRégionList(): Localisation[] {
  return [
    {
      codeInsee: '32',
      libelle: 'Hauts-de-France',
    },
  ];
}
