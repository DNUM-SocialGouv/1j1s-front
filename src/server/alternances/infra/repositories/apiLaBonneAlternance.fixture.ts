import { AlternanceFiltre } from '~/server/alternances/domain/alternance';
import { AlternanceApiJobsResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';

export function anAlternanceFiltre(): AlternanceFiltre {
	return {
		codeCommune: '13180',
		codeRomes: ['D1406', 'D1407'],
		distanceCommune: '30',
		latitudeCommune: '48.2',
		longitudeCommune: '29.10',
	};
}

export const aLaBonneAlternanceApiJobsResponse = (): AlternanceApiJobsResponse => {
	return {
		matchas: {
			results: [
				{
					company: { name: 'une entreprise' },
					diplomaLevel: 'débutant',
					job: { contractType: ['Apprentissage'] },
					place: { city: 'paris' },
					title: 'un titre',
				},
				{
					company: {
						name: 'SARL HUGUE-DEBRIX',
					},
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					job: { contractType: ['Apprentissage'] },
					title: 'Boucher-charcutier / Bouchère-charcutière',
				},
				{
					company: {
						name: 'MONSIEUR MICHEL',
					},
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					job: { contractType: ['Apprentissage'] },
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
