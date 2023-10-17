import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

export function aResultatRechercheEmploiEuropeList(override?: Partial<ResultatRechercheEmploiEurope>): ResultatRechercheEmploiEurope {
	return {
		nombreResultats: 2,
		offreList: [
			{
				id: '1',
				nomEntreprise: 'La Boulangerie',
				tags: ['Paris'],
				titre: 'Boulanger (H/F)',
			},
			{
				id: '2',
				nomEntreprise: 'La Pâtisserie',
				tags: [],
				titre: 'Pâtissier (H/F)',
			},
		],
		...override,
	};
}
