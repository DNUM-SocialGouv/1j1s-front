import { AlternanceStatus } from '~/server/alternances/infra/status';

export namespace Alternance {
	export interface Entreprise {
		nom?: string | null
		adresse?: string | null
		téléphone?: string | null
	}
}

export interface Alternance {
	durée?: string | null
	id: string
	titre: string
	entreprise: Alternance.Entreprise
	description?: string | null
	descriptionEmployeur?: string | null
	localisation?: string | null
	niveauRequis?: string | null
	natureDuContrat?: string | null
	typeDeContrat?: string[] | null
	compétences?: string[] | null
	dateDébut?: Date | null
	rythmeAlternance?: string | null
	source: Alternance.Source
	lienPostuler?: string | null
	status?: AlternanceStatus | null
}

export type ResultatRechercheAlternance = {
	offreList: Array<ResultatRechercheAlternance.Offre>,
	entrepriseList: Array<ResultatRechercheAlternance.Entreprise>
}

export namespace ResultatRechercheAlternance {
	export type Offre = Pick<Alternance, 'id' | 'titre' | 'source' | 'entreprise' | 'localisation' | 'typeDeContrat' | 'niveauRequis'>

	export interface Entreprise {
		adresse?: string
		nom: string
		secteurs?: Array<string>
		id?: string
		candidaturePossible: boolean
		nombreSalariés?: NombreSalaries | null
	}

	export interface NombreSalaries {
		min: number
		max: number
	}
}

export namespace Alternance {
	export enum Source {
		MATCHA,
		FRANCE_TRAVAIL,
	}

	export enum Contrat {
		ALTERNANCE = 'Contrat d‘alternance',
	}
}

export interface AlternanceFiltre {
	codeRomes: Array<string>
	codeCommune: string
	distanceCommune: string
	latitudeCommune: string
	longitudeCommune: string
}

export function isMatcha(source: Alternance.Source): source is Alternance.Source.MATCHA {
	return source === Alternance.Source.MATCHA;
}

export function isFranceTravail(source: Alternance.Source): source is Alternance.Source.FRANCE_TRAVAIL {
	return source === Alternance.Source.FRANCE_TRAVAIL;
}
