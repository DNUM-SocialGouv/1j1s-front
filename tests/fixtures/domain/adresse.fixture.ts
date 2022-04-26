import { Adresse } from '~/server/localisations/domain/adresse';

export function anAdresseList(): Adresse[] {
  return [
    {
      codeInsee: '93005',
      libelle: '20 Avenue Jules Jouy 93600 Aulnay-sous-Bois',
      ville: 'Aulnay-sous-Bois',
    },
    {
      codeInsee: '28201',
      libelle: '20 Avenue de la Gare 28300 Jouy',
      ville: 'Jouy',
    },
  ];
}
