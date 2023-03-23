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

export type RésultatRechercheAlternance = {
	offreList: Array<RésultatRechercheAlternance.Offre>,
	entrepriseList: Array<RésultatRechercheAlternance.Entreprise>
}

export namespace RésultatRechercheAlternance {
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
		POLE_EMPLOI,
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

export function isPoleEmploi(source: Alternance.Source): source is Alternance.Source.POLE_EMPLOI {
	return source === Alternance.Source.POLE_EMPLOI;
}
