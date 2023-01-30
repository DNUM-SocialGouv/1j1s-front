import {
	AnnonceDeLogement,
	AnnonceDeLogementResponse,
} from '~/server/cms/domain/annonceDeLogement.type';

const uneDate = () => new Date('2022-01-01T00:00:00.000Z');
export const uneAnnonceDeLogementResponse = (): AnnonceDeLogementResponse => {
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
			{ nom: AnnonceDeLogementResponse.ServiceInclus.INTERNET },
			{ nom: AnnonceDeLogementResponse.ServiceInclus.ASPIRATEUR },
		],
		servicesOptionnels: [
			{ nom: AnnonceDeLogementResponse.ServiceOptionnel.TV },
			{ nom: AnnonceDeLogementResponse.ServiceOptionnel.LOCAL_A_VELO },
		],
		slug: 'logement-slug',
		source: 'immojeune',
		sourceCreatedAt: uneDate(),
		sourceUpdatedAt: uneDate(),
		surface: 10,
		surfaceMax: 12,
		titre: 'mon titre',
		type: 'Location',
		typeBien: 'Appartement',
		url: 'lien-immo-jeune.com',
	};
};

export const uneAnnonceDeLogement = (): AnnonceDeLogement => {
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
		imageUrlList: [],
		localisation: { ville: 'paris' },
		meublé: true,
		nombreDePièces: 1,
		prix: 1000,
		prixHT: 980,
		servicesInclus: [
			AnnonceDeLogement.ServiceInclus.INTERNET,
			AnnonceDeLogement.ServiceInclus.ASPIRATEUR,
		],
		servicesOptionnels: [
			AnnonceDeLogement.ServiceOptionnel.TV,
			AnnonceDeLogement.ServiceOptionnel.LOCAL_A_VELO,
		],
		source: 'immojeune',
		surface: 10,
		surfaceMax: 12,
		titre: 'mon titre',
		type: 'Location',
		typeBien: 'Appartement',
		urlDeCandidature: 'lien-immo-jeune.com',
		étage: 1,
	};
};
