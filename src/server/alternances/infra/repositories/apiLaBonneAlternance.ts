import Joi from 'joi';

import { AlternanceStatus } from '~/server/alternances/infra/status';

export interface MetierLaBonneAlternanceApiResponseLabelAndRomes {
	label: string
	romes: Array<string>
}


export interface MetierLaBonneAlternanceApiResponse {
	labelsAndRomes: Array<MetierLaBonneAlternanceApiResponseLabelAndRomes>
}

export interface AlternanceApiJobsResponseJob {
	id: string
	romeDetails?: AlternanceApiJobsResponseRomeDetails
	jobStartDate?: string
	contractType?: string
}

export interface AlternanceApiJobsResponseJobMatcha extends AlternanceApiJobsResponseJob {
	dureeContrat?: number
	rythmeAlternance?: string
	description?: string
	employeurDescription?: string
	status?: AlternanceStatus
}

export interface AlternanceApiJobsResponseJobPE extends AlternanceApiJobsResponseJob {
	duration?: string
	contractDescription?: string
	description: string
}

export interface AlternanceApiJobsResponseRomeDetails {
	definition?: string
	competencesDeBase: Array<{ libelle: string }>
}

export interface AlternanceApiJobsResponsePlace {
	city?: string
	fullAddress?: string
}

export interface AlternanceApiJobsResponseCompany {
	name?: string
	place?: {
		city?: string
	}
}

export interface AlternanceApiJobsResponseCompanyLbaCompanies extends AlternanceApiJobsResponseCompany {
	size?: string
	siret?: string
	name: string
}

export interface AlternanceApiJobsResponseContact {
	phone?: string
}

export interface AlternanceApiJobsResponseMatcha {
	title: string
	company?: AlternanceApiJobsResponseCompany
	place?: AlternanceApiJobsResponsePlace
	diplomaLevel?: string
	job: AlternanceApiJobsResponseJobMatcha
	contact?: AlternanceApiJobsResponseContact
}

export interface AlternanceApiJobsResponsePEJobs {
	title: string
	company?: AlternanceApiJobsResponseCompany
	place?: AlternanceApiJobsResponsePlace
	job: AlternanceApiJobsResponseJobPE
	url?: string
}

export interface AlternanceApiJobsResponseLbaCompanies {
	company: AlternanceApiJobsResponseCompanyLbaCompanies
	nafs?: Array<{
		label: string
	}>
	place?: AlternanceApiJobsResponsePlace
	contact?: {
		email?: string,
		iv?: string
	}
}

export interface AlternanceApiJobsResponse {
	matchas?: { results?: Array<AlternanceApiJobsResponseMatcha> }
	peJobs?: { results?: Array<AlternanceApiJobsResponsePEJobs> }
	lbaCompanies: { results: Array<AlternanceApiJobsResponseLbaCompanies> } | []
}

export const apiLaBonneAlternanceSchemas = {
	getFranceTravail: Joi.object({
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
				description: Joi.string(),
				duration: Joi.string(),
			}),
			place: Joi.object({
				city: Joi.string(),
				fullAddress: Joi.string().allow(null),
			}),
			title: Joi.string(),
			url: Joi.string(),
		})),
	}).options({ allowUnknown: true }),
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
			}),
			place: Joi.object({
				city: Joi.string().allow(null),
				fullAddress: Joi.string().allow(null),
			}),
			title: Joi.string(),
		})),
	}).options({ allowUnknown: true }),
	search: Joi.object({
		matchas: Joi.object({
			results: Joi.array().items(Joi.object({
				company: Joi.object({
					name: Joi.string(),
				}),
				contact: Joi.object({
					phone: Joi.string(),
				}).allow(null),
				diplomaLevel: Joi.string(),
				job: Joi.object({
					contractType: Joi.string().allow(''),
					dureeContrat: Joi.number(),
					id: Joi.string(),
					jobStartDate: Joi.string(),
					romeDetails: Joi.object({
						competencesDeBase: Joi.array().items(Joi.object({
							libelle: Joi.string(),
						})),
						definition: Joi.string(),
					}),
					rythmeAlternance: Joi.string().allow(null),
				}),
				place: Joi.object({
					city: Joi.string().allow(null),
					fullAddress: Joi.string().allow(null),
				}),
				title: Joi.string(),
			})),
		}),
		peJobs: Joi.object({
			results: Joi.array().items(Joi.object({
				company: Joi.object({
					// NOTE (BRUJ 03/06/2024): ne devrait pas être optionel, la clef n'est pas présente
					name: Joi.string().optional(),
				}),
				job: Joi.object({
					contractDescription: Joi.string(),
					description: Joi.string(),
					// NOTE (BRUJ 03/06/2024): ne devrait pas être optionel, la clef n'est pas présente
					duration: Joi.string().optional(),
				}),
				place: Joi.object({
					city: Joi.string(),
					fullAddress: Joi.string(),
				}),
				title: Joi.string(),
				url: Joi.string(),
			})),
		}),
	}).options({ allowUnknown: true, presence: 'required' }).required(),
};
