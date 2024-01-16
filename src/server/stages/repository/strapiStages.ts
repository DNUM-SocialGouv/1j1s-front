import { DomainesStage } from '~/server/stages/repository/domainesStage';
import { SourceDesDonnées } from '~/server/stages/repository/sourceDesDonnéesStage';


export namespace OffreStageResponseStrapi {
	export interface OffreStage {
		titre: string
		id: string
		slug: string
		dateDeDebutMin: string
		dateDeDebutMax: string
		createdAt: string
		publishedAt: string
		updatedAt: string
		description: string
		urlDeCandidature: string | null
		sourceCreatedAt: string
		sourceUpdatedAt: string
		sourcePublishedAt: string
		identifiantSource: string | null
		domaines?: Array<OffreStageResponseStrapi.Domaines>
		dureeEnJour: number | null
		dureeEnJourMax: number | null
		localisation?: OffreStageResponseStrapi.Localisation
		employeur?: OffreStageResponseStrapi.Employeur
		remunerationBase: number | null
		source: SourceDesDonnées | null
		teletravailPossible: boolean | null
	}

	export interface Localisation {
		adresse: string | null;
		ville: string | null;
		departement: string | null;
		codePostal: string | null;
		region: string | null;
		pays: string | null;
	}

	export interface Employeur {
		nom: string;
		description: string | null;
		logoUrl: string | null;
		siteUrl: string | null;
		email: string | null;
	}

	export interface Domaines {
		nom: DomainesStage;
	}

}

export type OffreStageDepotStrapi =
	Pick<OffreStageResponseStrapi.OffreStage, 'dateDeDebutMin' | 'dateDeDebutMax' | 'description' | 'domaines' | 'dureeEnJour' | 'remunerationBase' | 'teletravailPossible' | 'titre'>
	& {
	identifiantSource: string;
	publishedAt: null;
	urlDeCandidature: string;
	localisation: OffreStageResponseStrapi.Localisation;
	employeur: OffreStageResponseStrapi.Employeur;
	source: SourceDesDonnées.INTERNE;
}
