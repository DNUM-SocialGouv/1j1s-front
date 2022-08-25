export interface FicheMétierResult {
	results: FicheMétier[]
	estimatedTotalResults: number
	limit: number
	offset: number
	processingTimeMs: number
}

export interface FicheMétier {
	accesMetier: string
	accrocheMetier: string
	centresInteret: FicheMetierNestedField[],
	competences: string
	conditionTravail: string
	formationsMinRequise: FicheMetierNestedField[]
	id: string
	idOnisep: string
	natureTravail: string
	niveauMinAcces: FicheMetierNestedField[]
	nomMetier: string
	secteursActivite: FicheMetierNestedField[],
	statuts: FicheMetierNestedFieldStatut[],
	vieProfessionnelle: string
}

export interface FicheMetierNestedField {
	id: number
	idOnisep: string
	libelle: string
}

export interface FicheMetierNestedFieldStatut extends FicheMetierNestedField {
	idIdeo: string
}

export interface FicheMetierFiltresRecherche {
	motCle: string
}
