import { Alternance, RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import {
  AlternanceFromMatcha,
  AlternanceFromPoleEmploi,
} from '~/server/alternances/infra/repositories/alternance.type';

export function aRésultatsRechercheAlternance(override?: Partial<RésultatsRechercheAlternance>): RésultatsRechercheAlternance {
  return {
    nombreRésultats: 2,
    résultats: [
      {
        adresse: '15 - AURILLAC 15000',
        description: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
        entreprise: {
          logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
          nom: 'AUCHAN SUPERMARCHE',
        },
        from: 'peJob',
        id: '134CMXJ',
        intitulé: 'APPRENTI (E) BOUCHER (ERE) (H/F)',
        niveauRequis: 'Alternance',
        typeDeContrats: [
          'CDD',
        ],
        ville: 'AURILLAC (15)',
        étiquetteList: [
          'AURILLAC (15)',
          'Alternance',
          'CDD',
        ],
      },
      {
        adresse: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
        description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
        entreprise: {
          nom: 'BOUCHERIE STEPHANE VEIT',
        },
        from: 'matcha',
        id: '628a64ed2ff4860027ae1501',
        intitulé: 'Boucherie',
        niveauRequis: 'Cap, autres formations niveau (Infrabac)',
        typeDeContrats: [
          'Apprentissage',
          'Professionnalisation',
        ],
        étiquetteList: [
          'Cap, autres formations niveau (Infrabac)',
          'Apprentissage',
          'Professionnalisation',
        ],
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

export function aMétierList(): MétierRecherché[] {
  return [
    {
      codeROMEList: [
        'H1302', 'H1206', 'H2502',
        'H1102', 'I1102', 'H1502',
        'H1504', 'H1209', 'H1402',
        'F1203', 'I1302', 'I1304',
        'F1401', 'F1402', 'H2701',
      ],
      intitulé: 'Energie',
    },
    {
      codeROMEList: [ 'I1307' ],
      intitulé: 'Installation et maintenance réseaux telecom et énergie',
    },
    { codeROMEList: [ 'F1603', 'I1308' ], intitulé: 'Plomberie' },
    {
      codeROMEList: [
        'H1209', 'H1504',
        'H1102', 'H1206',
        'I1102', 'H1502',
        'H2502',
      ],
      intitulé: 'Génie électrique',
    },
    {
      codeROMEList: [
        'H1102', 'H1403',
        'H1404', 'H1206',
        'H1402', 'H1401',
        'H1502', 'H2502',
        'H1203',
      ],
      intitulé: 'Ingéniérie d\'affaires en industrie',
    },
    {
      codeROMEList: [
        'H1206', 'H1502',
        'H2502', 'H1203',
        'H1403', 'H1404',
        'H1402', 'H1204',
        'H3102', 'H3101',
      ],
      intitulé: 'Industrie du papier, carton, emballage',
    },
    {
      codeROMEList: [
        'I1304', 'I1602',
        'I1305', 'H2602',
        'I1302', 'H2901',
        'H2909', 'H1502',
        'H1206', 'I1102',
      ],
      intitulé: 'Aéronautique',
    },
  ];
}

export function anApprentiBoucherOffreFromPoleEmploi(): Alternance {
  return {
    adresse: '15 - AURILLAC 15000',
    contact: {
      nom: 'AUCHAN SUPERMARCHE - Mme BROUSSE',
      téléphone: undefined,
    },
    description: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
    entreprise: {
      logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
      nom: 'AUCHAN SUPERMARCHE',
    },
    from: 'peJob',
    id: '134CMXJ',
    intitulé: 'APPRENTI (E) BOUCHER (ERE) (H/F)',
    niveauRequis: 'Alternance',
    typeDeContrats: ['CDD'],
    ville: 'AURILLAC (15)',
    étiquetteList: ['AURILLAC (15)', 'Alternance', 'CDD'],
  };
}

export function anApprentiBoucherOffreFromMatcha(): Alternance {
  return {
    adresse: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
    contact: {
      nom: 'STEPHANE VEIT',
      téléphone: '0646057107',
    },
    description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
    entreprise: {
      logo: undefined,
      nom: 'BOUCHERIE STEPHANE VEIT',
    },
    from: 'matcha',
    id: '628a65a72ff4860027ae1531',
    intitulé: 'Boucherie',
    niveauRequis: 'Cap, autres formations niveau (Infrabac)',
    typeDeContrats: ['Apprentissage', 'Professionnalisation'],
    ville: undefined,
    étiquetteList: ['Cap, autres formations niveau (Infrabac)', 'Apprentissage', 'Professionnalisation'],
  };
}

export function anApprentiBoucherFromPoleEmploi(): AlternanceFromPoleEmploi {
  return {
    ...anApprentiBoucherOffreFromPoleEmploi(),
    duréeContrat: 'Contrat à durée déterminée - 24 Mois',
    rythmeAlternance: '35H Travail en équipe',
    url: 'https://candidat.pole-emploi.fr/offres/recherche/detail/134CMXJ',
  };
}

export function anApprentiBoucherFromMatcha(): AlternanceFromMatcha {
  return {
    ...anApprentiBoucherOffreFromMatcha(),
    competencesDeBase: [
      'Réceptionner des carcasses de viande',
      'Contrôler la qualité d\'un produit',
      'Préparer une carcasse aux opérations de découpe',
      'Découper de la viande',
      'Trier des pièces de viande',
      'Détailler des pièces de viande',
      'Conditionner des pièces de viande, des spécialités bouchères',
      'Disposer des produits sur le lieu de vente',
      'Renseigner un client',
      'Prendre la commande des clients',
      'Entretenir un espace de vente',
      'Nettoyer du matériel ou un équipement',
      'Entretenir un poste de travail',
      'Techniques de désossage',
      'Techniques de parage des viandes',
      'Boucherie',
      'Modes de cuisson des aliments',
      'Découpe de viande',
      'Chaîne du froid',
      'Stockage de produits alimentaires',
      'Règles d\'hygiène et de sécurité alimentaire',
      'Anatomie animale',
      'Utilisation de matériel de nettoyage',
      'Techniques d\'embossage de viande',
      'Ficelage des viandes',
      'Traçabilité des produits',
      'Techniques de transformation des viandes',
    ],
    duréeContrat: 1,
    débutContrat: '09/01/2022',
    rythmeAlternance: '2 semaines / 3 semaines',
  };
}
