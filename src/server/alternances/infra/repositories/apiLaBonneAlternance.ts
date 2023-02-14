export namespace MetierLaBonneAlternanceApiResponse {
	export interface LabelAndRomes {
		label: string
		romes: Array<string>
	}
}
export interface MetierLaBonneAlternanceApiResponse {
	labelsAndRomes: Array<MetierLaBonneAlternanceApiResponse.LabelAndRomes>
}

export namespace AlternanceApiResponse {
	export interface Job {
		contractType?: string
	}

	export interface Place {
		city?: string
	}

	export interface Company {
		name?: string
	}

	export interface Matcha {
		title: string
		company?: AlternanceApiResponse.Company
		place?: AlternanceApiResponse.Place
		diplomaLevel?: string
		job: AlternanceApiResponse.Job
	}
}

export interface AlternanceListApiResponse {
	matchas: { results: Array<AlternanceApiResponse.Matcha> }
}
