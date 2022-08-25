export interface FicheMétierHttp {
	acces_metier: string
	accroche_metier: string
	centres_interet: FicheMétierHttpNestedField[],
	competences: string
	condition_travail: string
	formations_min_requise: FicheMétierHttpNestedField[]
	id: string
	identifiant: string
	nature_travail: string
	niveau_min_acces: FicheMétierHttpNestedField[]
	nom_metier: string
	secteurs_activite: FicheMétierHttpNestedField[],
	statuts: FicheMétierHttpNestedFieldStatut[],
	vie_professionnelle: string
}

export interface FicheMétierHttpNestedField {
	id: number
	identifiant: string
	libelle: string
}

export interface FicheMétierHttpNestedFieldStatut extends FicheMétierHttpNestedField {
	id_ideo1: string
}
