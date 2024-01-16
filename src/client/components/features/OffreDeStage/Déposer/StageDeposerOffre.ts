import { DomainesStage } from '~/server/stages/repository/domainesStage';

export namespace OffreDeStageDeposee {

	export interface Entreprise {
		descriptionEmployeur: string
		emailEmployeur: string
		logoEmployeur?: string
		nomEmployeur: string
		siteEmployeur?: string
	}

	export interface Stage {
		dateDeDebutMin: string
		dateDeDebutMax: string
		isDateDeDebutPrecise: 'true' | 'false'
		descriptionOffre: string
		domaineStage?: DomainesStage
		dureeStage: string
		lienCandidature: string
		nomOffre: string
		remunerationStage?: string
		teletravail?: 'true' | 'false'
	}

	export interface Localisation {
		pays: string
		ville: string
		adresse: string
		codePostal: string
		region?: string
		departement?: string
	}
}
