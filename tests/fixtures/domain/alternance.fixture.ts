import {
  Alternance,
  RésultatsRechercheAlternance,
} from '~/server/alternances/domain/alternance';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';
import { RésultatRechercheAlternance } from '~/server/alternances/infra/repositories/alternance.type';

export function aRésultatsRechercheAlternance(override?: Partial<RésultatsRechercheAlternance>): RésultatsRechercheAlternance {
  return {
    nombreRésultats: 4,
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
        typeDeContrats: ['CDD'],
        ville: 'AURILLAC (15)',
        étiquetteList: ['AURILLAC (15)', 'Alternance', 'CDD'],
      },
      {
        adresse: '57 - CHATEAU SALINS 57170',
        description: 'Nous sommes à la recherche d\'un(e) apprenti(e) boucher(ère) dans le cadre d\'un CAP.\n\nVous serez formé(e)  entre un centre de formation des apprentis et un employeur.\n\n Passionné(e) par l\'univers de la boucherie, vous souhaitez en faire votre métier, nous sommes prêts à vous former !',
        entreprise: {
          logo: undefined,
          nom: 'SUPERMARCHE MATCH',
        },
        from: 'peJob',
        id: '134BYGN',
        intitulé: 'Apprenti/e boucher/ère (H/F)',
        niveauRequis: 'Alternance',
        typeDeContrats: ['CDD'],
        ville: 'CHATEAU SALINS (57)',
        étiquetteList: ['CHATEAU SALINS (57)', 'Alternance', 'CDD'],
      },
      {
        adresse: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
        description: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
        entreprise: {
          logo: undefined,
          nom: 'BOUCHERIE STEPHANE VEIT',
        },
        from: 'matcha',
        id: '628a64ed2ff4860027ae1501',
        intitulé: 'Boucherie',
        niveauRequis: 'Cap, autres formations niveau (Infrabac)',
        typeDeContrats: ['Apprentissage', 'Professionnalisation'],
        ville: undefined,
        étiquetteList: ['Cap, autres formations niveau (Infrabac)', 'Apprentissage', 'Professionnalisation'],
      },
      {
        adresse: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
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

export function anApprentiBoucherOffreFromPoleEmploi(): Alternance {
  return {
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
    typeDeContrats: ['CDD'],
    ville: 'AURILLAC (15)',
    étiquetteList: ['AURILLAC (15)', 'Alternance', 'CDD'],
  };
}

export function anApprentiBoucherOffreFromMatcha(): Alternance {
  return {
    adresse: '77 RUE DES BOURGUIGNONS 92270 BOIS-COLOMBES',
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

export function anApprentiBoucherFromPoleEmploi(): RésultatRechercheAlternance {
  return {
    ...anApprentiBoucherOffreFromPoleEmploi(),
    contact: {
      info: 'Pour postuler, utiliser le lien suivant : https://candidat.pole-emploi.fr/offres/recherche/detail/134CMXJ',
      téléphone: undefined,
    },
    duréeContrat: '35H Travail en équipe',
    url: 'https://candidat.pole-emploi.fr/offres/recherche/detail/134CMXJ',
  };
}

export function anApprentiBoucherFromMatcha(): RésultatRechercheAlternance {
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
    contact: {
      nom: 'STEPHANE VEIT',
      téléphone: '0646057107',
    },
    duréeContrat: 1,
    débutContrat: '2022-01-09T00:00:00.000Z',
    rythmeAlternance: '2 semaines / 3 semaines',
  };
}
