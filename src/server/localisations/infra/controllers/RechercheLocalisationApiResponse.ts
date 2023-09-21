export interface LocalisationApiResponse {
	nom: string
	code: string
}

export interface LocalisationCommuneApiResponse extends LocalisationApiResponse {
	codePostal: string
}

export type RechercheLocalisationApiResponse = {
	communeList: LocalisationCommuneApiResponse[]
	departementList: LocalisationApiResponse[]
	regionList: LocalisationApiResponse[]
}
