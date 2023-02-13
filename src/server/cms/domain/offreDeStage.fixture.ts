import { OffreDeStage, SourceDesDonnées } from '~/server/cms/domain/offreDeStage.type';

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
