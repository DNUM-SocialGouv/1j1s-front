import { DomainesStage } from '~/server/stages/repository/domainesStage';
import { SourceDesDonnées } from '~/server/stages/repository/sourceDesDonnéesStage';

export interface EmployeurStageCMS {
	nom: string
	description?: string
	logoUrl?: string
	siteUrl?: string
}

export interface OffreDeStage {
	titre: string
	id: string
	slug: string
	dateDeDebutMin?: string
	dateDeDebutMax?: string
	description: string
	urlDeCandidature?: string
	domaines: Array<DomainesStage>
	dureeEnJour?: number
	dureeEnJourMax?: number
	localisation?: OffreDeStage.Localisation
	employeur?: EmployeurStageCMS
	remunerationBase?: number
	source?: SourceDesDonnées
	teletravailPossible?: boolean
}

export namespace OffreDeStage {
	export interface Localisation {
		ville?: string
		departement?: string
		codePostal?: string
		region?: string
		pays?: string
	}
}


export namespace OffreStageDepot {
	interface Localisation {
		adresse: string
		ville: string
		departement: string | null
		codePostal: string
		region: string | null
		pays: string
	}

	export interface EmployeurDepotStage {
		nom: string
		description: string
		logoUrl: string | null
		siteUrl: string | null
		email: string
	}

	export interface OffreDeStageDepot {
		dateDeDebutMin: string
		dateDeDebutMax: string
		description: string
		domaine: DomainesStage
		duree: string
		employeur: EmployeurDepotStage
		localisation: Localisation
		remunerationBase: number
		teletravailPossible: boolean | null
		titre: string
		urlDeCandidature: string
	}
}
