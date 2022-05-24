import { RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

export function aRésultatsRechercheAlternance(override?: Partial<RésultatsRechercheAlternance>): RésultatsRechercheAlternance {
  return {
    nombreRésultats: 4,
    résultats: [
      {
        description: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
        entreprise: {
          logo: null,
          nom: 'AUCHAN SUPERMARCHE',
        },
        id: '134CMXJ',
        intitulé: 'APPRENTI (E) BOUCHER (ERE) (H/F)',
      },
      {
        description: 'Nous sommes à la recherche d\'un(e) apprenti(e) boucher(ère) dans le cadre d\'un CAP.\n\nVous serez formé(e)  entre un centre de formation des apprentis et un employeur.\n\n Passionné(e) par l\'univers de la boucherie, vous souhaitez en faire votre métier, nous sommes prêts à vous former !',
        entreprise: {
          logo: null,
          nom: 'SUPERMARCHE MATCH',
        },
        id: '134BYGN',
        intitulé: 'Apprenti/e boucher/ère (H/F)',
      },
      {
        description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
        entreprise: {
          logo: null,
          nom: 'BOUCHERIE STEPHANE VEIT',
        },
        id: '628a64ed2ff4860027ae1501',
        intitulé: 'Boucherie',
      },
      {
        description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
        entreprise: {
          logo: null,
          nom: 'BOUCHERIE STEPHANE VEIT',
        },
        id: '628a65a72ff4860027ae1531',
        intitulé: 'Boucherie',
      },
    ],
    ...override,
  };
}

export function aMétierRecherchéList(): MétierRecherché[] {
  return [
    {
      codeROMEList: ['D1103', 'D1101', 'H2101'],
      intitulé: 'Boucherie, charcuterie, traiteur',
    },
    {
      codeROMEList: ['D1102', 'D1104'],
      intitulé: 'Boulangerie, pâtisserie, chocolaterie',
    },
  ];
}
