

export interface Alternance {
	titre: string
	nomEntreprise?: string
	localisation?: string
	niveauRequis?: string
	typeDeContrat?: string
}

export interface AlternanceQuery {
	codeRomes: Array<string>
}
