import { EmploiFiltre } from '~/server/emplois/domain/emploi';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import { Offre, OffreFiltre, RésultatsRechercheOffre } from '~/server/offres/domain/offre';

export function aRésultatsRechercheOffre(override?: Partial<RésultatsRechercheOffre>): RésultatsRechercheOffre {
  return {
    nombreRésultats: 3,
    résultats: [
      aBarmanOffre(),
      aMaçonOffre(),
      aValetOffre(),
    ],
    ...override,
  };
}

export function aRésultatEchantillonOffre(): RésultatsRechercheOffre {
  return {
    nombreRésultats: 15,
    résultats: [
      aBarmanOffre(),
      aMaçonOffre(),
      aValetOffre(),
      aBarmanOffre(),
      aMaçonOffre(),
      aValetOffre(),
      aBarmanOffre(),
      aMaçonOffre(),
      aValetOffre(),
      aBarmanOffre(),
      aMaçonOffre(),
      aValetOffre(),
      aBarmanOffre(),
      aMaçonOffre(),
      aValetOffre(),
    ],
  };
}

export function aBarmanOffre(): Offre {
  return {
    compétenceList:[],
    description: 'Nous recherchons pour la saison demi-mai à mi-octobre 2022 un(e) Barman h/f.\n\nVos missions principales: \n- Vous effectuez le service au comptoir, en salle, en terrasse, de boissons chaudes ou froides selon la législation relative à la consommation d\'alcools. \n- Vous entretenez la verrerie, les équipements du bar et les locaux selon les règles d\'hygiène et la réglementation  en vigueur.\n- Vous participez à la vie de la paillote. \n \nVous travaillez vendredi et samedi. \n\n\n',
    duréeTravail: Offre.DuréeTravail.TEMPS_PARTIEL,
    entreprise: {
      logo: undefined,
      nom: 'LE PLEIN AIR',
    },
    expérience: Offre.Expérience.DEBUTANT_ACCEPTE,
    formationList: [
      { commentaire: 'Bac Pro Automobile',
        libellé: 'Bac ou équivalent' },
      { commentaire: 'Bac Pro Moto',
        libellé: 'Bac ou supérieur' }],
    id: '132LKFB',
    intitulé: 'Barman / Barmaid (H/F)',
    lieuTravail: 'BOURG LES VALENCE (26)',
    qualitéeProfessionnelleList: [],
    typeContrat: Offre.CONTRAT_SAISONNIER,
    urlOffreOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/132LKFB',
    étiquetteList: ['BOURG LES VALENCE (26)', 'Débutant accepté', 'Saisonnier', 'Temps partiel'],
  };
}

export function aMaçonOffre(): Offre {
  return {
    compétenceList:[],
    description: 'Vous recherchez un emploi ? Faites confiances à nos différences ! R.A.S Intérim, réseau d\'agences d\'emploi de 170 agences, propose des centaines d\'opportunités d\'emploi dans tous les secteurs d\'activité, en intérim, CDD et CDI.\n\nVotre Agence R.A.S Intérim de PORNIC, recherche un MACON dans pour un de ses clients spécialiste du BTP.\n\nVos missions:\n- Travaux de maçonnerie\n- Travaux sur différents matériaux (parpaings, brique...)\n- Lecture de plans\n\nVotre profil:\n- Titulaire d\'un CAP maçonnerie\n- Expérience sur un poste similaire\n- Rigueur/ Autonome\n\nDisponible? Envoyez nous votre CV !',
    duréeTravail: Offre.DuréeTravail.TEMPS_PARTIEL,
    entreprise: {
      logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
      nom: 'RAS 1040',
    },
    expérience: Offre.Expérience.EXPERIENCE_EXIGEE,
    formationList: [
      { commentaire: 'Bac pro Maçon',
        libellé: 'Bac ou supérieur' }],
    id: '130WPHC',
    intitulé: 'Maçon / Maçonne',
    lieuTravail: undefined,
    qualitéeProfessionnelleList: [],
    typeContrat: Offre.CONTRAT_INTÉRIMAIRE,
    urlOffreOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/130WPHC',
    étiquetteList: ['Expérience exigée', 'Intérim', 'Temps partiel'],
  };
}

export function aValetOffre(): Offre {
  return {
    compétenceList:[],
    description: 'Vous interviendrez sur le nettoyage des chambres de l\'Hôtel.\nVous changerez les draps et serviettes, nettoierez la salle de bain et les sanitaires, effectuerez la poussière et passerez l\'aspirateur.  \n\nNous vous proposons un contrat en vacation, vous devez pouvoir être disponible les weekend. 3 à 4 vacations par semaine.\nLa durée du contrat et le nombre d\'heure varieront en fonction des nécessites du service; c\'est à dire de 20 h à 24h de travail par semaine.\n\nPrise de poste au plus tôt.\n',
    duréeTravail: Offre.DuréeTravail.TEMPS_PARTIEL,
    entreprise: {
      logo: undefined,
      nom: undefined,
    },
    expérience: Offre.Expérience.EXPERIENCE_SOUHAITEE,
    formationList: [],
    id: '132MDKM',
    intitulé: 'Valet / Femme de chambre',
    lieuTravail: 'BALARUC LES BAINS (34)',
    qualitéeProfessionnelleList: [],
    typeContrat: Offre.CONTRAT_CDD,
    urlOffreOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/132MDKM',
    étiquetteList: ['BALARUC LES BAINS (34)', 'Expérience souhaitée', 'CDD', 'Temps partiel'],
  };
}

export function anOffreEmploiFiltre(override?: Partial<EmploiFiltre>): EmploiFiltre {
  return {
    experienceExigence: '',
    grandDomaineList: [],
    localisation: {
      code: '34',
      type: TypeLocalisation.REGION,
    },
    motClé: 'boulanger',
    page: 1,
    typeDeContratList: ['CDD', 'CDI'],
    ...override,
  };
}

export function anOffreÉchantillonFiltre(): OffreFiltre {
  return {
    page: 1,
  };
}

export function anOffreÉchantillonAvecLocalisationEtMotCléFiltre(override?: Partial<OffreFiltre>): OffreFiltre {
  return {
    localisation: {
      code: '75001',
      type: TypeLocalisation.COMMUNE,
    },
    motClé: 'boulanger',
    page: 1,
    ...override,
  };
}
