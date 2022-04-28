import {
  OffreEmploi,
  OffreEmploiFiltre, RésultatsRechercheOffreEmploi,
} from '~/server/offresEmploi/domain/offreEmploi';

export function aRésultatsRechercheOffreEmploi(): RésultatsRechercheOffreEmploi {
  return {
    résultats: [
      aBarmanOffreEmploi(),
      aMaçonOffreEmploi(),
      aValetOffreEmploi(),
    ],
    nbRésultats: 12,
  };
}

export function aBarmanOffreEmploi(): OffreEmploi {
  return {
    description: 'Nous recherchons pour la saison demi-mai à mi-octobre 2022 un(e) Barman h/f.\n\nVos missions principales: \n- Vous effectuez le service au comptoir, en salle, en terrasse, de boissons chaudes ou froides selon la législation relative à la consommation d\'alcools. \n- Vous entretenez la verrerie, les équipements du bar et les locaux selon les règles d\'hygiène et la réglementation  en vigueur.\n- Vous participez à la vie de la paillote. \n \nVous travaillez vendredi et samedi. \n\n\n',
    duréeTravail: OffreEmploi.DuréeTravail.TEMPS_PARTIEL,
    entreprise: {
      logo: undefined,
      nom: 'LE PLEIN AIR',
    },
    expérience: OffreEmploi.Expérience.DEBUTANT_ACCEPTE,
    id: '132LKFB',
    intitulé: 'Barman / Barmaid (H/F)',
    lieuTravail: 'BOURG LES VALENCE (26)',
    typeContrat: OffreEmploi.TypeContrat.SAI,
  };
}

export function aMaçonOffreEmploi(): OffreEmploi {
  return {
    description: 'Vous recherchez un emploi ? Faites confiances à nos différences ! R.A.S Intérim, réseau d\'agences d\'emploi de 170 agences, propose des centaines d\'opportunités d\'emploi dans tous les secteurs d\'activité, en intérim, CDD et CDI.\n\nVotre Agence R.A.S Intérim de PORNIC, recherche un MACON dans pour un de ses clients spécialiste du BTP.\n\nVos missions:\n- Travaux de maçonnerie\n- Travaux sur différents matériaux (parpaings, brique...)\n- Lecture de plans\n\nVotre profil:\n- Titulaire d\'un CAP maçonnerie\n- Expérience sur un poste similaire\n- Rigueur/ Autonome\n\nDisponible? Envoyez nous votre CV !',
    entreprise: {
      logo: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
      nom: 'RAS 1040',
    },
    expérience: OffreEmploi.Expérience.EXPERIENCE_EXIGEE,
    id: '130WPHC',
    intitulé: 'Maçon / Maçonne',
    lieuTravail: 'ST PERE EN RETZ (44)',
    duréeTravail: OffreEmploi.DuréeTravail.TEMPS_PARTIEL,
    typeContrat: OffreEmploi.TypeContrat.MIS,
  };
}

export function aValetOffreEmploi(): OffreEmploi {
  return {
    description: 'Vous interviendrez sur le nettoyage des chambres de l\'Hôtel.\nVous changerez les draps et serviettes, nettoierez la salle de bain et les sanitaires, effectuerez la poussière et passerez l\'aspirateur.  \n\nNous vous proposons un contrat en vacation, vous devez pouvoir être disponible les weekend. 3 à 4 vacations par semaine.\nLa durée du contrat et le nombre d\'heure varieront en fonction des nécessites du service; c\'est à dire de 20 h à 24h de travail par semaine.\n\nPrise de poste au plus tôt.\n',
    duréeTravail: OffreEmploi.DuréeTravail.TEMPS_PARTIEL,
    entreprise: {
      logo: undefined,
      nom: 'IBIS SETE BALARUC',
    },
    expérience: OffreEmploi.Expérience.EXPERIENCE_SOUHAITEE,
    id: '132MDKM',
    intitulé: 'Valet / Femme de chambre',
    lieuTravail: 'BALARUC LES BAINS (34)',
    typeContrat: OffreEmploi.TypeContrat.CDD,
  };
}

export function anOffreEmploiFiltre(
  override?: Partial<OffreEmploiFiltre>,
): OffreEmploiFiltre {
  return {
    motClé: 'boulanger',
    page: 1,
    ...override,
  };
}
