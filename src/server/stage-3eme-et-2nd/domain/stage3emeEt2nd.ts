export interface Stage3emeEt2nd {
	accessiblePersonnesEnSituationDeHandicap: boolean,
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

export interface ResultatRechercheStage3emeEt2nd {
	nombreDeResultats: number
	resultats: Array<Stage3emeEt2nd>
}

export interface Stage3emeEt2ndFiltre {
	codeMetier?: string
	latitudeCommune: string
	longitudeCommune: string
	distanceCommune: string
}
