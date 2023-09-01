import { OffreDeStage, SourceDesDonnées } from '~/server/cms/domain/offreDeStage.type';
import Localisation = OffreDeStage.Localisation;

export function anOffreDeStage(overrides?: Partial<OffreDeStage>): OffreDeStage {
	return {
		dateDeDebutMax: '2024-09-01',
		dateDeDebutMin: '2024-09-01',
		description: 'Poste ouvert aux personnes en situation de handicap',
		domaines: [],
		dureeEnJour: 720,
		dureeEnJourMax: 800,
		employeur: {
			description: undefined,
			logoUrl: undefined,
			nom: 'La Relève',
			siteUrl: undefined,
		},
		id: 'anId',
		localisation: {
			codePostal: undefined,
			departement: undefined,
			pays: 'France',
			region: undefined,
			ville: undefined,
		},
		remunerationBase: 1000,
		slug: 'alternance-audit-tours-h-f-036780b7-95ba-4711-bf26-471d1f95051c',
		source: SourceDesDonnées.JOBTEASER,
		teletravailPossible: true,
		titre: 'Alternance Audit - Tours ( H/F)',
		urlDeCandidature: 'https://www.jobteaser.com/en/job-offers/10067252',
		...overrides,
	};
}

export function anOffreDeStageLocalisation(override?: Partial<Localisation>): Localisation {
	return {
		codePostal: undefined,
		departement: undefined,
		pays: undefined,
		region: undefined,
		ville: undefined,
		...override,
	};
}
