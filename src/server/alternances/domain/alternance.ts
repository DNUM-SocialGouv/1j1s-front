export interface Alternance {
	id: string
	titre: string
	description?: string
	nomEntreprise?: string
	localisation?: string
	niveauRequis?: string
	typeDeContrat?: string[]
	compétences?: Array<string>
	dateDébut?: Date,
	source: Alternance.Source
	tags: string[]
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
