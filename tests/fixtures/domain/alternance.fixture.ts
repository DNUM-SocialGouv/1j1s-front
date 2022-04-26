import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

export function aMétierRecherchéList(): MétierRecherché[] {
  return [
    {
      intitule: 'Boucherie, charcuterie, traiteur',
      répertoireOpérationnelMétiersEmplois: ['D1103', 'D1101', 'H2101'],
    },
    {
      intitule: 'Boulangerie, pâtisserie, chocolaterie',
      répertoireOpérationnelMétiersEmplois: ['D1102', 'D1104'],
    },
  ];
}
