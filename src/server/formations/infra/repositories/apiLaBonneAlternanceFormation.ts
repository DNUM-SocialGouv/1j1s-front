export namespace ApiLaBonneAlternanceFormationRechercheResponse {
	export interface Company {
		name?: string;
	}

	export interface Place {
		city?: string;
		fullAddress?: string;
		latitude?: number;
		longitude?: number;
		zipCode?: string;
	}

	export interface Formation {
		title: string;
		company?: ApiLaBonneAlternanceFormationRechercheResponse.Company;
		place?: ApiLaBonneAlternanceFormationRechercheResponse.Place;
		diplomaLevel?: string;
		idRco: string;
		cfd?: string;
		cleMinistereEducatif?: string;
	}
}

export interface ApiLaBonneAlternanceFormationRechercheResponse {
	results: Array<ApiLaBonneAlternanceFormationRechercheResponse.Formation>;
}

export interface ApiLaBonneAlternanceFormationResponse {
	results: ApiLaBonneAlternanceFormation[];
}

export interface ApiLaBonneAlternanceFormation {
	title?: string,
	place?: {
		fullAddress?: string,
		city?: string,
		latitude?: number
		longitude?: number,
		zipCode?: string,
	},
	company?: {
		name?: string
	},
	id: string,
	cleMinistereEducatif: string,
	training?: {
		description?: string,
		objectif?: string,
	}
}
