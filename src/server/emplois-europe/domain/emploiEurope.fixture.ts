import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

export function aResultatRechercheEmploiEuropeList(override?: Partial<ResultatRechercheEmploiEurope>): ResultatRechercheEmploiEurope {
	return {
		nombreResultats: 2,
		offreList: [
			{
				id: '1',
			},
			{
				id: '2',
			},
		],
		...override,
	};
}
