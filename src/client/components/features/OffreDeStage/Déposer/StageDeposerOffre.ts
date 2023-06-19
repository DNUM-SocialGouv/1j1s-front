import { Domaines } from '~/server/cms/domain/offreDeStage.type';

export namespace OffreDeStageDeposee {

	export interface Entreprise {
		descriptionEmployeur: string
		emailEmployeur: string
		logoEmployeur?: string
		nomEmployeur: string
		siteEmployeur?: string
	}

	// TODO (DORO 21-06-2023): à supprimer après la mise en place du nouveau modèle de données
	export interface Stage {
		dateDeDebut: string
		dateDeDebutMin: string
		dateDeDebutMax: string
		dateDeDebutPrecise: 'true' | 'false'
		descriptionOffre: string
		domaineStage?: Domaines
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
