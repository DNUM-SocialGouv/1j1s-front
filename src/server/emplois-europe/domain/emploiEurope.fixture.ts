import { EmploiEurope, ResultatRechercheEmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

export function aResultatRechercheEmploiEuropeList(override?: Partial<ResultatRechercheEmploiEurope>): ResultatRechercheEmploiEurope {
	return {
		nombreResultats: 2,
		offreList: [
			anEmploiEurope({
				id: '1',
				nomEntreprise: 'La Boulangerie',
				pays: 'France',
				titre: 'Boulanger (H/F)',
				urlCandidature: 'https://urlDeCandidature.com',
				ville: 'Paris',
			}),
			anEmploiEurope({
				id: '2',
				nomEntreprise: 'La Pâtisserie',
				pays: 'France',
				titre: 'Pâtissier (H/F)',
				urlCandidature: 'https://urlDeCandidature2.com',
				ville: 'Paris',
			}),
		],
		...override,
	};
}

export function anEmploiEurope(override?: Partial<EmploiEurope>): EmploiEurope {
	return {
		id: '1',
		nomEntreprise: 'La Boulangerie',
		pays: 'France',
		titre: 'Boulanger (H/F)',
		urlCandidature: 'https://urlDeCandidature.com',
		ville: 'Paris',
		...override,
	};
}
