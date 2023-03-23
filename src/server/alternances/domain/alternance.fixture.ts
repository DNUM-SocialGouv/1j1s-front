import { Alternance, RésultatRechercheAlternance } from './alternance';

export const anAlternanceMatcha = (override?: Partial<Alternance>): Alternance => {
	return {
		compétences: ['savoir faire'],
		description: 'Prépare et confectionne des produits de pâtisserie.',
		entreprise: {
			nom: 'une entreprise',
		},
		id: 'id',
		lienPostuler: `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}postuler?caller=1jeune1solution&itemId=id&type=matcha`,
		localisation: 'paris',
		niveauRequis: 'débutant',
		source: Alternance.Source.MATCHA,
		tags: ['paris', 'Apprentissage', 'CDI', 'débutant'],
		titre: 'un titre',
		typeDeContrat: ['Apprentissage', 'CDI'],
		...override,
	};
};

const anAlternanceMatchaBoucher = (): Alternance => {
	return {
		compétences: [],
		description: 'Super alternance dans une boucherie',
		entreprise: {
			nom: 'SARL HUGUE-DEBRIX',
		},
		id: 'id-boucher',
		lienPostuler: `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}postuler?caller=1jeune1solution&itemId=id-boucher&type=matcha`,
		niveauRequis: 'Cap, autres formations niveau (Infrabac)',
		source: Alternance.Source.MATCHA,
		tags: ['Apprentissage', 'Cap, autres formations niveau (Infrabac)'],
		titre: 'Boucher-charcutier / Bouchère-charcutière',
		typeDeContrat: ['Apprentissage'],
	};
};

const anAlternanceMatchaBoulanger = (): Alternance => {
	return {
		compétences: [],
		description: 'Super alternance dans une boulangerie',
		entreprise: {
			nom: 'MONSIEUR MICHEL',
		},
		id: 'id-boulanger',
		lienPostuler: `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}postuler?caller=1jeune1solution&itemId=id-boulanger&type=matcha`,
		niveauRequis: 'Cap, autres formations niveau (Infrabac)',
		source: Alternance.Source.MATCHA,
		tags: ['Apprentissage', 'Cap, autres formations niveau (Infrabac)'],
		titre: 'Ouvrier boulanger / Ouvrière boulangère',
		typeDeContrat: ['Apprentissage'],
	};
};

export const anAlternancePEJobs = (): Alternance => {
	return {
		description: 'description offre',
		entreprise: {
			nom: 'une entreprise',
		},
		id: 'alternance-pejob',
		localisation: 'paris',
		natureDuContrat: 'Contrat d‘alternance',
		source: Alternance.Source.POLE_EMPLOI,
		tags: ['paris', 'Contrat d‘alternance', 'CDD'],
		titre: 'un titre',
		typeDeContrat: ['CDD'],
	};
};

export const anAlternanceEntreprise = (): RésultatRechercheAlternance.Entreprise => {
	return {
		adresse: 'une adresse',
		candidaturePossible: true,
		id: '0123456789',
		nom: 'un nom',
		secteurs: ['secteur 1', 'secteur 2'],
		tags: ['une ville', '12 salariés', 'Candidature spontanée'],
		ville: 'une ville',
	};
};

export const anAlternanceEntrepriseSansCandidature = (): RésultatRechercheAlternance.Entreprise => {
	return {
		candidaturePossible: false,
		id: '1234567890',
		nom: 'un nom',
		secteurs: ['secteur 1', 'secteur 2'],
		tags: ['une ville', '12 salariés', 'Candidature spontanée'],
	};
};

export const aRésultatRechercherMultipleAlternance = (): RésultatRechercheAlternance => {
	return {
		entrepriseList: [anAlternanceEntreprise(), anAlternanceEntrepriseSansCandidature()],
		offreList: [anAlternanceMatcha(), anAlternanceMatchaBoucher(), anAlternanceMatchaBoulanger(), anAlternancePEJobs()],
	};
};
