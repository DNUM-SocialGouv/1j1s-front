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
	matchas: { results: Array<AlternanceApiResponse.Matcha>}
}

export interface Alternance {
	titre: string
	nomEntreprise?: string
	localisation?: string
	niveauRequis?: string
	typeDeContrat?: string
}

export interface AlternanceQuery {
	codeRomes: Array<string>
}
