export namespace ApiLaBonneAlternanceFormationResponse {
	export interface Company {
		name?: string
	}

	export interface Place {
		city?: string
		fullAddress?: string
	}

	export interface Formation {
		title: string
		company?: ApiLaBonneAlternanceFormationResponse.Company
		place?: ApiLaBonneAlternanceFormationResponse.Place
		diplomaLevel?: string
	}
}

export interface ApiLaBonneAlternanceFormationResponse {
	results: Array<ApiLaBonneAlternanceFormationResponse.Formation>
}
