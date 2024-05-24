export interface FormationInitialeApiResponse {
	code_nsf: string,
	sigle_type_formation: string,
	libelle_type_formation: string,
	libelle_formation_principal: string,
	duree: string,
	niveau_de_sortie_indicatif: string,
	niveau_de_certification: string,
	url_et_id_onisep: string,
}

export interface ResultatRechercheFormationInitialeApiResponse {
	total: number
	size: number
	from: number
	results: Array<FormationInitialeApiResponse>
}
