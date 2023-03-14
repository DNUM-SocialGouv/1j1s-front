import { Domaines } from '~/server/cms/domain/offreDeStage.type';

export namespace OffreDeStageDéposée {

	export interface Entreprise {
		descriptionEmployeur: string
		emailEmployeur: string
		logoEmployeur?: string
		nomEmployeur: string
		siteEmployeur?: string
	}

	export interface Stage {
		dateDebut: string
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
