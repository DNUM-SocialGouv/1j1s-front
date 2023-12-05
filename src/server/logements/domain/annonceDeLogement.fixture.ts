import { Service } from '~/server/logements/infra/strapiAnnonceDeLogement';

import { AnnonceDeLogement } from './annonceDeLogement';

export function anAnnonceDeLogement(override?: Partial<AnnonceDeLogement>): AnnonceDeLogement {
	return {
		bilanEnergetique: {
			consommationEnergetique: 'A',
			emissionDeGaz: 'B',
		},
		charge: 100,
		dateDeDisponibilité: '11/11/11',
		dateDeMiseAJour: '1/1/2022',
		description: 'appart à saisir',
		devise: '€',
		garantie: 50,
		imageList: [],
		localisation: { ville: 'paris' },
		meublé: true,
		nombreDePièces: 1,
		prix: 1000,
		prixHT: 980,
		servicesInclus: [
			Service.INTERNET,
			Service.ASPIRATEUR,
		],
		servicesOptionnels: [
			Service.TV,
			Service.LOCAL_A_VELO,
		],
		source: 'immojeune',
		surface: 10,
		surfaceMax: 12,
		titre: 'mon titre',
		type: 'Location',
		typeBien: 'Appartement',
		urlDeCandidature: 'lien-immo-jeune.com',
		étage: 1,
		...override,
	};
}
