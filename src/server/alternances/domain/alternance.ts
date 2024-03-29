export namespace Alternance {
	export interface Entreprise {
		nom?: string
		adresse?: string
		téléphone?: string
	}
}

export interface Alternance {
	durée?: string
	id: string
	titre: string
	entreprise: Alternance.Entreprise
	description?: string
	descriptionEmployeur?: string
	localisation?: string
	niveauRequis?: string
	natureDuContrat?: string
	typeDeContrat?: string[]
	compétences?: string[]
	dateDébut?: Date
	rythmeAlternance?: string
	source: Alternance.Source
	tags: string[]
	lienPostuler?: string
}

export type ResultatRechercheAlternance = {
	offreList: Array<ResultatRechercheAlternance.Offre>,
	entrepriseList: Array<ResultatRechercheAlternance.Entreprise>
}

export namespace ResultatRechercheAlternance {
	export type Offre = Pick<Alternance, 'id' | 'titre' | 'source' | 'tags' | 'entreprise'>
	export interface Entreprise {
		adresse?: string
		ville?: string
		nom: string
		secteurs?: Array<string>
		tags: string[]
		id?: string
		candidaturePossible: boolean
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
