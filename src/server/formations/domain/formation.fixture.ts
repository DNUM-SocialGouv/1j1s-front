import { Formation, NiveauRequis } from './formation';

export const aRésultatFormation = (): Array<Formation> => [
	{
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
