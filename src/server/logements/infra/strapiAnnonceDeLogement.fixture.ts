import { AnnonceDeLogement } from '~/server/logements/domain/annonceDeLogement';

import { StrapiAnnonceDeLogement } from './strapiAnnonceDeLogement';

const aDate = () => new Date('2022-01-01T00:00:00.000Z');
export function aStrapiAnnonceDeLogement(override?: Partial<StrapiAnnonceDeLogement>): StrapiAnnonceDeLogement {
	return {
		bilanEnergetique: {
			consommationEnergetique: 'A',
			emissionDeGaz: 'B',
		},
		charge: 100,
		dateDeDisponibilite: '11/11/11',
		description: 'appart à saisir',
		devise: '€',
		etage: 1,
		garantie: 50,
		localisation: { ville: 'paris' },
		meuble: true,
		nombreDePieces: 1,
		prix: 1000,
		prixHT: 980,
		servicesInclus: [
			{ nom: AnnonceDeLogement.Service.INTERNET },
			{ nom: AnnonceDeLogement.Service.ASPIRATEUR },
		],
		servicesOptionnels: [
			{ nom: AnnonceDeLogement.Service.TV },
			{ nom: AnnonceDeLogement.Service.LOCAL_A_VELO },
		],
		slug: 'logement-slug',
		source: 'immojeune',
		sourceCreatedAt: aDate(),
		sourceUpdatedAt: aDate(),
		surface: 10,
		surfaceMax: 12,
		titre: 'mon titre',
		type: 'Location',
		typeBien: 'Appartement',
		url: 'lien-immo-jeune.com',
		...override,
	};
}

export function anAnnonceDeLogementSlugList(): Array<string> {
	return [
		'studio-bis-de-28m-a-partir-de-645-1439954',
		'appartement-t2-de-30m-a-partir-de-675-par-mois-1439955',
		'studio-avec-grand-lit-double-et-canape-de-23-24-m-a-partir-de-465-par-mois-1470875',
	];
}
