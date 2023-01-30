import {
	DomaineStageDepot,
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
		dateDeDebut: '2023-02-03',
		description: 'Vous assurez la préparation des commandes clients en prélevant les produits dans les emplacements via le système informatique Vous prenez en charge la réception, le déchargement, le réapprovisionnement des produit Vous gérez la réception des commandes par les clients Vous veillez au rangement et à la propreté de la zone de travail',
		domaines: [
			{ nom: 'achats' },
		] as DomaineStageDepot[],
		dureeEnJour: 900,
		employeur: {
			description: 'description entreprise',
			email: 'example@example.com',
			logoUrl: 'https://fake-url.com',
			nom: 'SNCF',
			siteUrl: 'https://fake-url.com',
		},
		identifiantSource: '123456789',
		localisation: {
			adresse: 'Vieux port Marseille',
			codePostal: '13000',
			departement: 'Var',
			pays: 'FR',
			region: "Provence-Alpes-Côte d'Azure",
			ville: 'Paris',
		},
		publishedAt: null,
		remunerationBase: 560,
		source: 'interne' as SourceDesDonnées,
		teletravailPossible: true,
		titre: 'Assistant conducteur train',
		urlDeCandidature: 'mailto:admin@example.com',
	};
};
