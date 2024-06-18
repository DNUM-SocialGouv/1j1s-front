import { AlternanceStatus } from '~/server/alternances/infra/status';

import { Alternance, AlternanceFiltre, ResultatRechercheAlternance } from './alternance';

export const aRechercheAlternance = (override?: Partial<ResultatRechercheAlternance>): ResultatRechercheAlternance => {
	return {
		entrepriseList: [
			aRechercheEntrepriseAlternance(),
			aRechercheEntrepriseAlternance({
				candidaturePossible: false,
				id: '1234567890',
			}),
		],
		offreList: [
			aRechercheMatchaAlternance(),
			aRechercheMatchaAlternance({
				entreprise: {
					nom: 'SARL HUGUE-DEBRIX',
				},
				id: 'id-boucher',
				titre: 'Boucher-charcutier / Bouchère-charcutière',
			}),
			aRechercheMatchaAlternance({
				entreprise: {
					nom: 'MONSIEUR MICHEL',
				},
				id: 'id-boulanger',
				titre: 'Ouvrier boulanger / Ouvrière boulangère',
			}),
			aRecherchePEJobAlternance(),
		],
		...override,
	};
};

export const aRechercheEntrepriseAlternance = (override?: Partial<ResultatRechercheAlternance.Entreprise>): ResultatRechercheAlternance.Entreprise => {
	return {
		adresse: 'une adresse',
		candidaturePossible: true,
		id: '0123456789',
		nom: 'un nom',
		nombreSalariés: { max: 9, min: 0 },
		secteurs: ['secteur 1', 'secteur 2'],
		ville: 'une ville',
		...override,
	};
};

export const aRechercheMatchaAlternance = (override?: Partial<ResultatRechercheAlternance.Offre>): ResultatRechercheAlternance.Offre => {
	return {
		entreprise: {
			nom: 'une entreprise',
		},
		id: 'id',
		localisation: 'Paris',
		niveauRequis: 'débutant',
		source: Alternance.Source.MATCHA,
		titre: 'un titre',
		typeDeContrat: ['Apprentissage', 'CDI'],
		...override,
	};
};

export const aRecherchePEJobAlternance = (override?: Partial<ResultatRechercheAlternance.Offre>): ResultatRechercheAlternance.Offre => {
	return {
		entreprise: {
			nom: 'ECOLE DE TRAVAIL ORT',
		},
		id: 'id 2',
		localisation: 'PARIS 4',
		niveauRequis: undefined,
		source: Alternance.Source.FRANCE_TRAVAIL,
		titre: 'Monteur / Monteuse en chauffage (H/F)',
		typeDeContrat: ['CDD'],
		...override,
	};
};

export function aDetailMatchaAlternance(override?: Partial<Alternance>): Alternance {
	return {
		compétences: ['savoir faire'],
		description: 'Prépare et confectionne des produits de pâtisserie.',
		entreprise: {
			adresse: 'full address',
			nom: 'une entreprise',
			téléphone: 'phone',
		},
		id: 'id',
		lienPostuler: `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}postuler?caller=1jeune1solution&itemId=id&type=matcha`,
		localisation: 'paris',
		niveauRequis: 'débutant',
		source: Alternance.Source.MATCHA,
		status: AlternanceStatus.ACTIVE,
		titre: 'un titre',
		typeDeContrat: ['Apprentissage', 'CDI'],
		...override,
	};
};

export function aDetailPEJobAlternance(override?: Partial<Alternance>): Alternance {
	return {
		description: 'description',
		durée: 'CDD de 6 mois',
		entreprise: {
			adresse: 'full address',
			nom: 'ECOLE DE TRAVAIL ORT',
			téléphone: 'phone',
		},
		id: 'id 2',
		lienPostuler: 'url',
		localisation: 'PARIS 4',
		natureDuContrat: 'Contrat d‘alternance',
		niveauRequis: undefined,
		rythmeAlternance: '6 mois',
		source: Alternance.Source.FRANCE_TRAVAIL,
		titre: 'Monteur / Monteuse en chauffage (H/F)',
		typeDeContrat: ['CDD'],
		...override,
	};
};


export function anAlternanceFiltre(override?: Partial<AlternanceFiltre>): AlternanceFiltre {
	return {
		codeCommune: '12345',
		codeRomes: ['A1234', 'B1234'],
		distanceCommune: '10',
		latitudeCommune: '1.234',
		longitudeCommune: '2.345',
		...override,
	};
}
