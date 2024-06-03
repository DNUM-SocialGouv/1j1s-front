import { AlternanceFiltre } from '~/server/alternances/domain/alternance';
import { AlternanceApiJobsResponse } from '~/server/alternances/infra/repositories/apiLaBonneAlternance';
import { AlternanceStatus } from '~/server/alternances/infra/status';
import Matcha = AlternanceApiJobsResponse.Matcha;
import LbaCompanies = AlternanceApiJobsResponse.LbaCompanies;
import PEJobs = AlternanceApiJobsResponse.PEJobs;

export function anAlternanceFiltre(): AlternanceFiltre {
	return {
		codeCommune: '13180',
		codeRomes: ['D1406', 'D1407'],
		distanceCommune: '30',
		latitudeCommune: '48.2',
		longitudeCommune: '29.10',
	};
}

export const aLaBonneAlternanceApiJobsResponse = (override?: Partial<AlternanceApiJobsResponse>): AlternanceApiJobsResponse => {
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
				aPeJobsResponse({
					company: { name: 'une entreprise' },
					job: {
						contractDescription: 'CDD de 6 mois',
						contractType: 'CDD',
						description: 'description offre',
						id: 'alternance-pejob',
						romeDetails: {
							competencesDeBase: [],
							definition: 'Super alternance dans un bar',
						},
					},
					place: { city: 'paris', fullAddress: 'full address' },
					title: 'un titre',
				}),
			],
		},
		...override,
	};
};

export function aPeJobsResponse(override?: Partial<PEJobs>): PEJobs {
	return {
		company: { name: 'ECOLE DE TRAVAIL ORT' },
		job: {
			contractDescription: 'CDD de 6 mois',
			contractType: 'CDD',
			description: 'description',
			duration: '6 mois',
			id: 'id 2',
		},
		place: {
			city: 'PARIS 4',
			fullAddress: 'full address',
		},
		title: 'Monteur / Monteuse en chauffage (H/F)',
		url: 'url',
		...override,
	};
}

export function aMatchaResponse(override?: Partial<Matcha>): Matcha {
	return {
		company: {
			name: 'une entreprise',
		},
		contact: {
			phone: 'phone',
		},
		diplomaLevel: 'débutant',
		job: {
			contractType: 'Apprentissage, CDI',
			dureeContrat: 3,
			id: 'id',
			jobStartDate: '2020-01-01',
			romeDetails: {
				competencesDeBase: [{ libelle: 'savoir faire' }],
				definition: 'Prépare et confectionne des produits de pâtisserie.',
			},
			rythmeAlternance: '6 mois',
			status: AlternanceStatus.ACTIVE,
		},
		place: {
			city: 'paris',
			fullAddress: 'full address',
		},
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
