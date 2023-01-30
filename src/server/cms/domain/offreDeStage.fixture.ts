import {
	Domaines, DomaineStageCMS,
	OffreDeStage,
	OffreDeStageDepot,
	OffreDeStageResponse,
	SourceDesDonnées,
} from '~/server/cms/domain/offreDeStage.type';

export const uneOffreDeStageResponse = (): OffreDeStageResponse => {
	return {
		createdAt: '2023-01-06T07:49:10.773Z',
		dateDeDebut: '2024-09-01',
		description: 'Poste ouvert aux personnes en situation de handicap',
		domaines: undefined,
		duree: '',
		dureeEnJour: 720,
		dureeEnJourMax: 800,
		employeur: undefined,
		id: 'anId',
		identifiantSource: '036780b7-95ba-4711-bf26-471d1f95051c',
		localisation: { pays: 'France' },
		publishedAt: '2023-01-06T07:49:10.756Z',
		remunerationBase: 1000,
		slug: 'alternance-audit-tours-h-f-036780b7-95ba-4711-bf26-471d1f95051c',
		source: 'jobteaser' as SourceDesDonnées,
		sourceCreatedAt: '',
		sourcePublishedAt: '',
		sourceUpdatedAt: '',
		teletravailPossible: true,
		titre: 'Alternance Audit - Tours ( H/F)',
		updatedAt: '2023-01-06T07:49:10.773Z',
		urlDeCandidature: 'https://www.jobteaser.com/en/job-offers/10067252',
	};
};

export const uneOffreDeStage = (): OffreDeStage => {
	return {
		createdAt: '2023-01-06T07:49:10.773Z',
		dateDeDebut: '2024-09-01',
		description: 'Poste ouvert aux personnes en situation de handicap',
		domaines: undefined,
		duree: '',
		dureeEnJour: 720,
		dureeEnJourMax: 800,
		employeur: undefined,
		id: 'anId',
		identifiantSource: '036780b7-95ba-4711-bf26-471d1f95051c',
		localisation: { pays: 'France' },
		publishedAt: '2023-01-06T07:49:10.756Z',
		remunerationBase: 1000,
		slug: 'alternance-audit-tours-h-f-036780b7-95ba-4711-bf26-471d1f95051c',
		source: 'jobteaser' as SourceDesDonnées,
		sourceCreatedAt: '',
		sourcePublishedAt: '',
		sourceUpdatedAt: '',
		teletravailPossible: true,
		titre: 'Alternance Audit - Tours ( H/F)',
		updatedAt: '2023-01-06T07:49:10.773Z',
		urlDeCandidature: 'https://www.jobteaser.com/en/job-offers/10067252',
	};
};

export const anOffreDeStageDepot = (): OffreDeStageDepot => {
	return {
		dateDeDebut: '15/10/2022',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		domaine: Domaines.AGRICULTURE,
		duree: '2 mois',
		dureeEnJour: 60,
		employeur: {
			description: 'Lorem ipsum dolor sit amet',
			logoUrl: 'https://fake-url-logo.com',
			nom: 'Nom de l entreprise',
			siteUrl: 'https://site-entreprise.com',
		},
		localisation: {
			pays: 'France',
			ville: 'Marseille',
		},
		remunerationBase: 1000,
		source: SourceDesDonnées.DEPOT_STAGE,
		teletravailPossible: true,
		titre: 'Développeur fullStack',
		urlDeCandidature: 'https://fake-url.com',
	};
};
