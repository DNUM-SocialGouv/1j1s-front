import Joi from 'joi';

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
		competencesDeBase: Array<{ libelle: string }>
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

	export interface CompanyLbaCompanies extends Company {
		size?: string
		siret?: string
		name: string
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

	export interface LbaCompanies {
		company: AlternanceApiJobsResponse.CompanyLbaCompanies
		nafs?: Array<{
			label: string
		}>
		place?: AlternanceApiJobsResponse.Place
		contact?: {
			email?: string,
			iv?: string
		}
	}
}

export interface AlternanceApiJobsResponse {
	matchas?: { results?: Array<AlternanceApiJobsResponse.Matcha> }
	peJobs?: { results?: Array<AlternanceApiJobsResponse.PEJobs> }
	lbaCompanies: { results: Array<AlternanceApiJobsResponse.LbaCompanies> } | []
}

export const apiLaBonneAlternanceSchemas = {
	getMatcha: Joi.object({
		matchas: Joi.array().items(Joi.object({
			company: Joi.object({
				name: Joi.string(),
				place: Joi.object({
					city: Joi.string(),
				}),
			}),
			contact: Joi.object({
				phone: Joi.string(),
			}),
			diplomaLevel: Joi.string(),
			job: Joi.object({
				dureeContrat: Joi.number(),
				rythmeAlternance: Joi.string(),
			}).required(),
			place: Joi.object({
				city: Joi.string().allow(null),
				fullAddress: Joi.string(),
			}),
			title: Joi.string().required(),
		})),
	}).options({ allowUnknown: true }),
	getPoleEmploi:Joi.object({
		peJobs: Joi.array().items(Joi.object({
			company: Joi.object({
				name: Joi.string(),
				place: Joi.object({
					city: Joi.string(),
				}),
			}),
			contact: Joi.object({
				phone: Joi.string(),
			}),
			job: Joi.object({
				contractDescription: Joi.string(),
				description: Joi.string().required(),
				duration: Joi.string(),
			}).required(),
			place: Joi.object({
				city: Joi.string(),
				fullAddress: Joi.string(),
			}),
			title: Joi.string().required(),
			url: Joi.string(),
		})),
	}).options({ allowUnknown: true }),
	search: Joi.object({
		matchas: Joi.object({
			results: Joi.array().items(Joi.object({
				company: Joi.object({
					name: Joi.string(),
					place: Joi.object({
						city: Joi.string(),
					}),
				}),
				contact: Joi.object({
					phone: Joi.string(),
				}),
				diplomaLevel: Joi.string(),
				job: Joi.object({
					contractType: Joi.string(),
					dureeContrat: Joi.number(),
					id: Joi.string(),
					jobStartDate: Joi.string(),
					romeDetails: Joi.object({
						competencesDeBase: Joi.array().items(Joi.object({
							libelle: Joi.string(),
						})),
						definition: Joi.string(),
					}),
					rythmeAlternance: Joi.string(),
				}).required(),
				place: Joi.object({
					city: Joi.string().allow(null),
					fullAddress: Joi.string(),
				}),
				titlerieng: Joi.string().required(),
			})),
		}).required(),
		peJobs: Joi.object({
			results: Joi.array().items(Joi.object({
				company: Joi.object({
					name: Joi.string(),
					place: Joi.object({
						city: Joi.string(),
					}),
				}),
				contact: Joi.object({
					phone: Joi.string(),
				}),
				job: Joi.object({
					contractDescription: Joi.string(),
					description: Joi.string().required(),
					duration: Joi.string(),
				}).required(),
				place: Joi.object({
					city: Joi.string(),
					fullAddress: Joi.string(),
				}),
				title: Joi.string().required(),
				url: Joi.string(),
			})),
		}).required(),
	}).options({ allowUnknown: true }),
};
