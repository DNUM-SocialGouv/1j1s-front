export interface LocalisationApiResponse {
	nom: string
	code: string
	libelle: string
}

export interface CommuneLocalisationApiResponse extends LocalisationApiResponse {
	codePostal: string
}

export type RechercheLocalisationApiResponse = {
	communeList: CommuneLocalisationApiResponse[]
	departementList: LocalisationApiResponse[]
	regionList: LocalisationApiResponse[]
}
