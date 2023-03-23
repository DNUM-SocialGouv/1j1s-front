import { Statistique } from '~/server/formations/domain/statistique';

export const statistiques = (override?: Partial<Statistique>): Statistique => {
	return {
		millesime: '2020-2021',
		region: 'Pays de la Loire',
		tauxAutres6Mois: '12',
		tauxEnEmploi6Mois: '36',
		tauxEnFormation: '22',
		...override,
	};
};
