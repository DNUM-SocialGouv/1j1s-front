import { AlternanceFiltre } from '~/server/alternances/domain/alternance';
import {
	AlternanceApiJobsResponse,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import Matcha = AlternanceApiJobsResponse.Matcha;
import LbaCompanies = AlternanceApiJobsResponse.LbaCompanies;

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
		lbaCompanies: {
			results: [aLbaCompaniesResponse()],
		},
		matchas: {
			results: [
				aMatchaResponse(),
				aMatchaResponse({
					company: { name: 'SARL HUGUE-DEBRIX' },
					diplomaLevel: 'Cap, autres formations niveau (Infrabac)',
					job: {
						contractType: 'Apprentissage',
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
						contractType: 'Apprentissage, CDD',
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
						description: 'description offre',
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
			contractType: 'Apprentissage, CDI',
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

export function aLbaCompaniesResponse(override?: Partial<LbaCompanies>): LbaCompanies {
	return {
		company: {
			name: 'CLUB VET',
			siret: '52352551700026',
			size: '0-0',
		},
		contact: {
			email: 'b3759ee20eff2e0a4cd369c4f2eb62238324fc',
			iv: '93f7bd08e956453cd8d0f8f75821a634',
		},
		nafs: [
			{
				label: 'Autres intermédiaires du commerce en produits divers',
			},
			{
				label: 'Développement informatique',
			},
		],
		place: {
			city: 'Paris',
			fullAddress: '18 RUE EMILE LANDRIN, 75020 Paris',
		},
		...override,
	};
}
