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
	niveauAccesMin: FicheMetierNestedField[]
	nomMetier: string
	secteursActivite: FicheMetierNestedField[],
	statuts: FicheMetierNestedFieldStatut[],
	vieProfessionnelle: string
}

export interface FicheMetierNestedField {
	idOnisep: string
	libelle: string
}

export interface FicheMetierNestedFieldStatut extends FicheMetierNestedField {
	idIdeo: string
}
