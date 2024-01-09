export interface Stage3eme {
	nomEntreprise: string
	adresse: Stage3eme.Adresse
	domaine: string
	nombreDeSalaries?: string
	modeDeContact?: string
}

export namespace Stage3eme {
	export interface Adresse {
		codeDepartement: string
		codePostal: string
		rueEtNumero: string
		ville: string
	}
}

export interface ResultatRechercheStage3eme {
	nombreDeResultats: number
	resultats: Array<Stage3eme>
}

export interface Stage3emeFiltre {
	codeMetier?: string
	latitudeCommune: string
	longitudeCommune: string
	distanceCommune: string
}
