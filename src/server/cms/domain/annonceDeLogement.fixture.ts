import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

const aDate = () => new Date('2022-01-01T00:00:00.000Z');
export const anAnnonceDeLogementResponse = (): Strapi.CollectionType.AnnonceLogement => {
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
			{ nom: Strapi.CollectionType.AnnonceLogement.ServiceInclus.INTERNET },
			{ nom: Strapi.CollectionType.AnnonceLogement.ServiceInclus.ASPIRATEUR },
		],
		servicesOptionnels: [
			{ nom: Strapi.CollectionType.AnnonceLogement.ServiceOptionnel.TV },
			{ nom: Strapi.CollectionType.AnnonceLogement.ServiceOptionnel.LOCAL_A_VELO },
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
	};
};

export const anAnnonceDeLogement = (): AnnonceDeLogement => {
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
			AnnonceDeLogement.Service.INTERNET,
			AnnonceDeLogement.Service.ASPIRATEUR,
		],
		servicesOptionnels: [
			AnnonceDeLogement.Service.TV,
			AnnonceDeLogement.Service.LOCAL_A_VELO,
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
