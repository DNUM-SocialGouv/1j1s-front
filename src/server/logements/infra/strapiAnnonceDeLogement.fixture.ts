import { Service, StrapiAnnonceDeLogement } from './strapiAnnonceDeLogement';

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
			{ nom: Service.INTERNET },
			{ nom: Service.ASPIRATEUR },
		],
		servicesOptionnels: [
			{ nom: Service.TV },
			{ nom: Service.LOCAL_A_VELO },
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
