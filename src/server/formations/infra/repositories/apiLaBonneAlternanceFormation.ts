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
	}
}

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

export interface ApiLaBonneAlternanceFormationResponse {
	intitule?: string
	organisme?: ApiLaBonneAlternanceFormationResponse.Organisme
	sessions: ApiLaBonneAlternanceFormationResponse.Session[]
	description?: string
	objectif?: string
	'duree-indicative'?: string
}
