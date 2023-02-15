import {
	AlternanceApiJobsResponse,
	MetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';


export const aMetierLaBonneAlternanceApiResponse = (): MetierLaBonneAlternanceApiResponse => {
	return {
		labelsAndRomes: [
			{ label: 'Vente, transaction, gestion immobilière', romes: ['C1504', 'C1501', 'C1502', 'C1503'] },
			{ label: 'Transport aérien', romes: ['N2101', 'N2102', 'N2203', 'N2204'] },
			{ label: 'Transport ferroviaire', romes: ['N4301', 'N4401', 'N4403'] },
		],
	};
};

export const aLaBonneAlternanceApiJobsResponse = (): AlternanceApiJobsResponse => {
	return {
		matchas: {
			results: [
				{
					company: { name: 'une entreprise' },
					diplomaLevel: 'débutant',
					job: { contractType: 'apprentissage' },
					place: { city: 'paris' },
					title: 'un titre',
				},
				{
					company: {
						name: 'SARL HUGUE-DEBRIX',
					},
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					job: { contractType: 'apprentissage' },
					title: 'Boucher-charcutier / Bouchère-charcutière',
				},
				{
					company: {
						name: 'MONSIEUR MICHEL',
					},
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					job: { contractType: 'apprentissage' },
					title: 'Ouvrier boulanger / Ouvrière boulangère',
				},
			],
		},
		peJobs: {
			results: [
				{
					company: { name: 'une entreprise' },
					job: { contractType: 'CDD' },
					place: { city: 'paris' },
					title: 'un titre',
				},
			],
		},
	};
};
