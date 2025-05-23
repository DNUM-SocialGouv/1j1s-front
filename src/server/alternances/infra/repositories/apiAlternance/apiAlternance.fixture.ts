import { AlternanceApiJobsResponse } from './apiAlternance';

export const aLocationResponse = makeFixture<AlternanceApiJobsResponse.Location>({
	address: '20 AVENUE DE SEGUR 75007 PARIS',
	geopoint: {
		coordinates: [
			48.859,
			2.347,
		],
		type: 'Point',
	},
});

export const aDomainResponse = makeFixture<AlternanceApiJobsResponse.Domain>({
	idcc: 1979,
	naf: {
		code: '8411Z',
		label: 'Administration publique générale',
	},
	opco: 'OPCO 2i',
});

export const aWorkplaceResponse = makeFixture<AlternanceApiJobsResponse.Workplace>({
	brand: 'Enseigne (todo)',
	description: 'Service du Premier ministre, placé sous l’autorité du ministre de la Transformation et de la Fonction publiques, la direction interministérielle du numérique (DINUM) a pour mission d’élaborer la stratégie numérique de l’État et de piloter sa mise en œuvre. Notre objectif : un État plus efficace, plus simple et plus souverain grâce au numérique.',
	domain: aDomainResponse(),
	legal_name: 'string',
	location: aLocationResponse(),
	name: 'DIRECTION INTERMINISTERIELLE DU NUMERIQUE (DINUM)',
	siret: '13002526500013',
	size: '100-199',
	website: 'https://beta.gouv.fr/startups/',
});

export const aContractResponse = makeFixture<AlternanceApiJobsResponse.Job.Contract>({
	duration: 12,
	remote: 'onsite',
	start: '2024-09-23T10:00:00.000Z',
	type: [
		'Apprentissage',
	],
});

export const anOfferResponse = makeFixture<AlternanceApiJobsResponse.Job.Offer>({
	access_conditions: [
		"Ce métier est accessible avec un diplôme de niveau Bac+2 (BTS, DUT) à Master (MIAGE, diplôme d'ingénieur, Master professionnel, ...) en informatique.",
	],
	description: "Conçoit, développe et met au point un projet d'application informatique, de la phase d'étude à son intégration, pour un client ou une entreprise selon des besoins fonctionnels et un cahier des charges. Peut conduire des projets de développement. Peut coordonner une équipe.",
	desired_skills: [
		"Faire preuve d'autonomie",
	],
	opening_count: 1,
	publication: {
		creation: '2024-07-23T13:23:01.000Z',
		expiration: '2027-05-14T00:00:00Z',
	},
	rome_codes: [
		'A1401',
	],
	status: 'Active',
	target_diploma: {
		european: '3',
		label: 'BP, Bac, autres formations niveau (Bac)',
	},
	title: 'Développeur / Développeuse web',
	to_be_acquired_skills: [
		'Recherche, Innovation : Analyser les indicateurs pertinents sur les tendances et les usages des clients',
	],
});

export const aJobIdentifierResponse = makeFixture<AlternanceApiJobsResponse.Job.Identifier>({
	id: '6687165396d52b5e01b409545',
	partner_job_id: 'b16a546a-e61f-4028-b5a3-1a7bbfaa4e3d',
	partner_label: 'France Travail',
});

export const aJobResponse = makeFixture<AlternanceApiJobsResponse.Job>({
	apply: {
		phone: '+33 1 99 00 00 00',
		url: 'https://labonnealternance.apprentissage.beta.gouv.fr/recherche-apprentissage?display=list&page=fiche&type=matcha&itemId=664752a2ebe24062b758c641',
	},
	contract: aContractResponse(),
	identifier: aJobIdentifierResponse(),
	offer: anOfferResponse(),
	workplace: aWorkplaceResponse(),
});

export const aRecruiterResponse = makeFixture<AlternanceApiJobsResponse.Recruiter>({
	apply: {
		phone: '+33 1 99 00 00 00',
		url: 'https://labonnealternance.apprentissage.beta.gouv.fr/recherche-apprentissage?display=list&page=fiche&type=matcha&itemId=664752a2ebe24062b758c641',
	},
	identifier: {
		id: '6687165396d52b5e01b409545',
	},
	workplace: aWorkplaceResponse(),
});

export const anAlternanceApiRechercheResponse = makeFixture<AlternanceApiJobsResponse>({
	jobs: [ aJobResponse() ],
	recruiters: [ aRecruiterResponse() ],
});

function makeFixture<T>(fixture: T): (overrides?: Partial<T>) => T {
	return function (overrides?: Partial<T>){
		return {
			...fixture,
			...overrides,
		};
	};
}
