import { Formation, NiveauRequis, RésultatRechercheFormation } from '~/server/formations/domain/formation';

export const aRésultatRechercheFormation = (): Array<RésultatRechercheFormation> => [
	{
		adresse: '1 rue de la République',
		codePostal: '75001',
		idRco: '123',
		nomEntreprise: 'La Bonne Alternance',
		tags: ['Paris', NiveauRequis['NIVEAU_4']],
		titre: 'Développeur web',
	},
	{
		idRco: '456',
		nomEntreprise: 'La Bonne Alternance',
		tags: ['Paris', 'Autre'],
		titre: 'Développeur web',
	},
];

export const aFormation = (): Formation => ({
	adresse: {
		adresseComplète: '1 rue de la République - 75001 - Paris',
		codePostal: '75001',
	},
	contact: {
		email: 'email@domaine.fr',
		tel: '01 23 45 67 89',
		url: 'https://domaine.fr',
	},
	description: 'Description de la formation',
	duréeIndicative: '1 an',
	nomEntreprise: 'La Bonne Alternance',
	nombreHeuresAuCentre: 100,
	nombreHeuresEnEntreprise: 200,
	objectif: 'Objectifs de la formation',
	tags: ['Paris'],
	titre: 'Développeur web',
});
