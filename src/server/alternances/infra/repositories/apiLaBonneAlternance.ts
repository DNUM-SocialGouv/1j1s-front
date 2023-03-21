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
		romeDetails?: AlternanceApiJobsResponse.RomeDetails
		jobStartDate?: string
		contractType?: string
	}

	export interface JobMatcha extends Job {
		dureeContrat?: number
		rythmeAlternance?: string
	}

	export interface JobPE extends Job {
		duration?: string
		contractDescription?: string
		description: string
	}

	export interface RomeDetails {
		definition?: string
		competencesDeBase: Array<{libelle: string}>
	}

	export interface Place {
		city?: string
		fullAddress?: string
	}

	export interface Company {
		name?: string
		place?: {
			city?: string
		}
	}

	export interface Contact {
		phone?: string
	}

	export interface Matcha {
		title: string
		company?: AlternanceApiJobsResponse.Company
		place?: AlternanceApiJobsResponse.Place
		diplomaLevel?: string
		job: AlternanceApiJobsResponse.JobMatcha
		contact?: AlternanceApiJobsResponse.Contact
	}

	export interface PEJobs {
		title: string
		company?: AlternanceApiJobsResponse.Company
		place?: AlternanceApiJobsResponse.Place
		job: AlternanceApiJobsResponse.JobPE
		contact?: AlternanceApiJobsResponse.Contact
		url?: string
	}
}

export interface AlternanceApiJobsResponse {
	matchas: { results: Array<AlternanceApiJobsResponse.Matcha> }
	peJobs: { results: Array<AlternanceApiJobsResponse.PEJobs> }
}
