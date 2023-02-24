export namespace MetierLaBonneAlternanceApiResponse {
	export interface LabelAndRomes {
		label: string
		romes: Array<string>
	}
}
export interface MetierLaBonneAlternanceApiResponse {
	labelsAndRomes: Array<MetierLaBonneAlternanceApiResponse.LabelAndRomes>
}

export namespace AlternanceApiJobsResponse {
	export interface Job {
		id: string
		description: string
		romeDetails?: AlternanceApiJobsResponse.RomeDetails
		jobStartDate?: string,
	}

	export interface RomeDetails {
		definition?: string,
		competencesDeBase: Array<{libelle: string}>
	}

	export interface Place {
		city?: string
	}

	export interface Company {
		name?: string
	}

	export interface Matcha {
		title: string
		company?: AlternanceApiJobsResponse.Company
		place?: AlternanceApiJobsResponse.Place
		diplomaLevel?: string
		contractType: string[]
		job: AlternanceApiJobsResponse.MatchaJob
	}

	export interface PEJobs {
		title: string
		company?: AlternanceApiJobsResponse.Company
		place?: AlternanceApiJobsResponse.Place
		contractType: string
		job: AlternanceApiJobsResponse.PEJob
	}
}

export interface AlternanceApiJobsResponse {
	matchas: { results: Array<AlternanceApiJobsResponse.Matcha> }
	peJobs: { results: Array<AlternanceApiJobsResponse.PEJobs> }
}
