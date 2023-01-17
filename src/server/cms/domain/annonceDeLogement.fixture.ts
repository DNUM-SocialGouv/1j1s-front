import {
	AnnonceDeLogement,
	AnnonceDeLogementResponse,
} from '~/server/cms/domain/annonceDeLogement.type';

const uneDate = () => new Date('2022-01-01T00:00:00.000Z');
export const uneAnnonceDeLogementResponse = (): AnnonceDeLogementResponse => {
	return {
		charge: 100,
		dateDeDisponibilite: '11/11/11',
		description: 'appart à saisir',
		devise: 'euros',
		etage: 1,
		garantie: 50,
		localisation: { ville: 'paris' },
		meuble: true,
		nombresDePieces: 1,
		prix: 1000,
		prixHT: 980,
		slug: 'logement-slug',
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
		charge: 100,
		dateDeDisponibilité: '11/11/11',
		dateDeMiseAJour: '1/1/2022',
		description: 'appart à saisir',
		garantie: 50,
		localisation: { ville: 'paris' },
		meublé: true,
		nombresDePièces: 1,
		prix: 1000,
		prixHT: 980,
		surface: 10,
		surfaceMax: 12,
		titre: 'mon titre',
		type: 'Location',
		typeBien: 'Appartement',
		étage: 1,
	};
};
