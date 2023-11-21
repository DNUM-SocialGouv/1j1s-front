export interface Stage3eme {
	nomEntreprise: string
	adresse: Stage3eme.Adresse
	domaine: string
}

export namespace Stage3eme {
	export interface Adresse {
		codeDepartement: string
		codePostal: string
		ligne: string
		ville: string
	}
}

export interface ResultatRechercheStage3eme {
	nombreDeResultats: number
	resultats: Array<Stage3eme>
}
