export namespace ApiLaBonneAlternanceFormationRechercheResponse {
	export interface Company {
		name?: string
	}

	export interface Place {
		city?: string
		fullAddress?: string
		zipCode?: string
	}

	export interface Formation {
		title: string
		company?: ApiLaBonneAlternanceFormationRechercheResponse.Company
		place?: ApiLaBonneAlternanceFormationRechercheResponse.Place
		diplomaLevel?: string
		idRco: string
		cfd?: string
		cleMinistereEducatif?: string
	}
}

export type IdRcoAndCléMinistèreÉducatif = Pick<ApiLaBonneAlternanceFormationRechercheResponse.Formation, 'idRco' | 'cleMinistereEducatif'>;

export interface ApiLaBonneAlternanceFormationRechercheResponse {
	results: Array<ApiLaBonneAlternanceFormationRechercheResponse.Formation>
}

export namespace ApiLaBonneAlternanceFormationResponse {
	export interface Contact {
		email?: string
		tel?: string
		url?: string
	}
	export interface Organisme {
		nom?: string
		contact?: ApiLaBonneAlternanceFormationResponse.Contact
	}
	export interface Localisation {
		formation?: {
			adresse?: string
			'code-postal'?: string
			ville?: string
		}
	}
	export interface Session {
		localisation?: ApiLaBonneAlternanceFormationResponse.Localisation
		'nombre-heures-entreprise'?: number
		'nombre-heures-centre'?: number

	}
}

export interface ApiLaBonneAlternanceFormationResponseOld {
	intitule?: string
	organisme?: ApiLaBonneAlternanceFormationResponse.Organisme
	sessions: ApiLaBonneAlternanceFormationResponse.Session[]
	description?: string
	objectif?: string
	'duree-indicative'?: string
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
		headquarter?: {
			name?: string
		}
	},
	id: string,
	cleMinistereEducatif: string,
	training?: {
		description?: string,
		objectif?: string,
	}
}

export interface AppointmentRequest {
	form_url?: string
}
