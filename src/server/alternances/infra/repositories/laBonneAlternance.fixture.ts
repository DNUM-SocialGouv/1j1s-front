import {
	AlternanceListApiResponse,
} from '~/server/alternances/domain/alternance';
import {
	MetierLaBonneAlternanceApiResponse,
} from '~/server/alternances/domain/métier';


export const aMetierLaBonneAlternanceApiResponse = (): MetierLaBonneAlternanceApiResponse => {
	return {
		labelsAndRomes: [
			{ label: 'Vente, transaction, gestion immobilière', romes: ['C1504', 'C1501', 'C1502', 'C1503'] },
			{ label: 'Transport aérien', romes: ['N2101', 'N2102', 'N2203', 'N2204'] },
			{ label: 'Transport ferroviaire', romes: ['N4301', 'N4401', 'N4403'] },
		],
	};
};

export const aListeLaBonneAlternanceApiResponse = (): AlternanceListApiResponse=> {
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
			],
		},
	};
};
