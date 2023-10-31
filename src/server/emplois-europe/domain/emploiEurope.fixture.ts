import { ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

export function aResultatRechercheEmploiEuropeList(override?: Partial<ResultatRechercheEmploiEurope>): ResultatRechercheEmploiEurope {
	return {
		nombreResultats: 2,
		offreList: [
			{
				id: '1',
				nomEntreprise: 'La Boulangerie',
				titre: 'Boulanger (H/F)',
				ville: 'Paris',
			},
			{
				id: '2',
				nomEntreprise: 'La Pâtisserie',
				titre: 'Pâtissier (H/F)',
			},
		],
		...override,
	};
}
