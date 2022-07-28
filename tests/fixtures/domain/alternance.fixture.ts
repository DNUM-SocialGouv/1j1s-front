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
    {
      codeROMEList: [
        'H1201', 'H1505', 'H2301',
        'H2504', 'H2701', 'H1503',
        'H1501', 'H1206', 'H2502',
        'I1102', 'H1402', 'H1102',
        'H1502', 'H1506', 'H1404',
      ],
      intitulé: 'Chimie',
    },
    {
      codeROMEList: [
        'H1206', 'H1402', 'H2502',
        'I1102', 'H1208', 'H1502',
        'H1209', 'H1504', 'I1305',
        'I1304', 'I1302', 'H2501',
        'H2603', 'H2604', 'H2605',
      ],
      intitulé: 'Electronique, informatique industrielle',
    },
    {
      codeROMEList: [
        'H2502', 'H1402', 'H2403',
        'H2404', 'H2405', 'H2406',
        'H2407', 'H2408', 'H2409',
        'H2410', 'H2411', 'H2412',
        'H2413', 'H2414', 'H2415',
      ],
      intitulé: 'Industrie Textile',
    },
    {
      codeROMEList: [
        'H3201', 'H3202', 'H3203',
        'H2504', 'H1206', 'H1402',
        'H2502', 'H1502', 'H2801',
        'H2802', 'H2803', 'H2804',
        'H2805', 'H3402', 'H3403',
      ],
      intitulé: 'Plasturgie et matériaux composites',
    },
    {
      codeROMEList: [
        'F1106', 'F1602', 'F1605',
        'I1305', 'I1309', 'I1306',
        'I1308', 'F1201', 'H1202',
        'H2602', 'H1502', 'H2501',
        'H1206', 'I1102', 'H2601',
      ],
      intitulé: 'Electricité, climatisation, domotique, électronique',
    },
    {
      codeROMEList: [
        'H1206', 'H1401', 'H1402',
        'H1502', 'H2502', 'H1303',
        'H2504', 'H1501', 'H1404',
        'I1304', 'H1302', 'I1102',
        'I1305', 'H1207', 'H1210',
      ],
      intitulé: 'Biologie, santé, sciences physiques',
    },
    {
      codeROMEList: [
        'I1310', 'I1304', 'H1404',
        'I1302', 'H2504', 'H1206',
        'H1402', 'H2502', 'I1102',
        'H1203', 'H2901', 'H2909',
        'I1301', 'I1303', 'I1502',
      ],
      intitulé: 'Mécanique, maintenance industrielle',
    },
    {
      codeROMEList: [
        'H2102', 'H1505',
        'H2701', 'H2906',
        'H3301', 'H3302',
        'H3303', 'H1206',
        'H1502', 'H1506',
        'H1302', 'H2502',
        'H1401', 'H1402',
      ],
      intitulé: 'Industrie Agroalimentaire',
    },
    {
      codeROMEList: [
        'H1102', 'H1206', 'H2502',
        'F1203', 'H1302', 'H1402',
        'H1502', 'I1102', 'H1404',
        'H1401', 'H1203', 'H2901',
        'H2909', 'I1302', 'I1304',
      ],
      intitulé: 'Génie industriel, ingéniérie généraliste',
    },
    {
      codeROMEList: [
        'H1208', 'I1301', 'I1302',
        'H1206', 'H2502', 'I1102',
        'I1304', 'I1305', 'H1203',
        'H1209', 'H1404', 'H1506',
        'H2504', 'H1401', 'H2901',
      ],
      intitulé: 'Robotique, systèmes automatisés',
    },
    {
      codeROMEList: [ 'G1204', 'L1401', 'H1206' ],
      intitulé: 'Métiers du sport',
    },
    {
      codeROMEList: [
        'H1404', 'H1506',
        'H1504', 'H1302',
        'H1502', 'H1303',
        'H1402', 'H1403',
        'H1206', 'H1501',
        'H1401', 'F1204',
        'H1301',
      ],
      intitulé: 'Risques, qualité, hygiène, sécurité, environnement (QHSE)',
    },
    {
      codeROMEList: [ 'I1503', 'H1303' ],
      intitulé: 'Assainissement biologique, nucléaire, dépollution',
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
