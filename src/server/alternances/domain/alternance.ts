export interface Alternance {
	titre: string
	nomEntreprise?: string
	localisation?: string
	niveauRequis?: string
	typeDeContrat?: string
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

export interface AlternanceQuery {
	codeRomes: Array<string>
}
