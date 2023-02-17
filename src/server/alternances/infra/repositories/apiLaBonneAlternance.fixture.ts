import { AlternanceFiltre } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiResponse,
	AlternanceApiJobsResponse,
	AlternanceListApiResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import Matcha = AlternanceApiResponse.Matcha;

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
					id: 'id',
					job: { contractType: ['Apprentissage'] },
					place: { city: 'paris' },
					title: 'un titre',
				},
				{
					company: {
						name: 'SARL HUGUE-DEBRIX',
					},
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					id: 'id-boucher',
					job: { contractType: ['Apprentissage'] },
					title: 'Boucher-charcutier / Bouchère-charcutière',
				},
				{
					company: {
						name: 'MONSIEUR MICHEL',
					},
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					id: 'id-boulanger',
					job: { contractType: ['Apprentissage'] },
					title: 'Ouvrier boulanger / Ouvrière boulangère',
				},
			],
		},
		peJobs: {
			results: [
				{
					company: { name: 'une entreprise' },
					id: 'alternance-pejob',
					job: { contractType: 'CDD' },
					place: { city: 'paris' },
					title: 'un titre',
				},
			],
		},
	};
};


export const aListeLaBonneAlternanceApiResponse = (override: Array<Matcha> = []): AlternanceListApiResponse => {
	return {
		matchas: {
			results: [
				aMatchaResponse(),
				...override,
			],
		},
	};
};

export function aMatchaResponse(override?: Partial<Matcha>): Matcha {
	return {
		company: { name: 'une entreprise' },
		diplomaLevel: 'débutant',
		id: 'id',
		job: { contractType: 'apprentissage' },
		place: { city: 'paris' },
		title: 'un titre',
		...override,
	};
}
