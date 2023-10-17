export namespace ApiLaBonneAlternanceFormationRechercheResponse {
	export interface Company {
		name?: string;
	}

	export interface Place {
		city?: string;
		fullAddress?: string;
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

export type IdRcoAndCleMinistereEducatif = Pick<ApiLaBonneAlternanceFormationRechercheResponse.Formation, 'idRco' | 'cleMinistereEducatif'>;

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
