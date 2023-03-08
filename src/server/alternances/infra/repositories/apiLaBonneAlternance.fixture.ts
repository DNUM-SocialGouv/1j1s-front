import { AlternanceFiltre } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import Matcha = AlternanceApiJobsResponse.Matcha;

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
				aMatchaResponse(),
				aMatchaResponse({
					company: { name: 'SARL HUGUE-DEBRIX' },
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					job: {
						contractType: ['Apprentissage'],
						description: 'Super alternance dans une boucherie',
						id: 'id-boucher',
						romeDetails: {
							competencesDeBase: [],
							definition: 'Super alternance dans une boucherie',
						},
					},
					place: { city: undefined },
					title: 'Boucher-charcutier / Bouchère-charcutière',
				}),
				aMatchaResponse({
					company: { name: 'MONSIEUR MICHEL' },
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					job: {
						contractType: ['Apprentissage'],
						description: 'Super alternance dans une boulangerie',
						id: 'id-boulanger',
						romeDetails: {
							competencesDeBase: [],
							definition: 'Super alternance dans une boulangerie',
						},
					},
					place: { city: undefined },
					title: 'Ouvrier boulanger / Ouvrière boulangère',
				}),
			],
		},
		peJobs: {
			results: [
				{
					company: { name: 'une entreprise' },
					job: {
						contractType: 'CDD',
						description: 'description offe',
						id: 'alternance-pejob',
						romeDetails: {
							competencesDeBase: [],
							definition: 'Super alternance dans un bar',
						},
					},
					place: { city: 'paris' },
					title: 'un titre',
				},
			],
		},
	};
};

export function aMatchaResponse(override?: Partial<Matcha>): Matcha {
	return {
		company: { name: 'une entreprise' },
		diplomaLevel: 'débutant',
		job: {
			contractType: ['Apprentissage'],
			description: 'une description d’offre matcha',
			id: 'id',
			romeDetails: {
				competencesDeBase: [{ libelle: 'savoir faire' }],
				definition: 'Prépare et confectionne des produits de pâtisserie.',
			},
		},
		place: { city: 'paris' },
		title: 'un titre',
		...override,
	};
}
