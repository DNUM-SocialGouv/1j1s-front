import { Formation, NiveauRequis } from './formation';

export const aRésultatFormation = (): Array<Formation> => [
	{
		adresse: '1 rue de la République',
		nomEntreprise: 'La Bonne Alternance',
		tags: ['Paris', NiveauRequis['NIVEAU_4']],
		titre: 'Développeur web',
	},
	{
		nomEntreprise: 'La Bonne Alternance',
		tags: ['Paris', 'Autre'],
		titre: 'Développeur web',
	},
];
