import Joi from 'joi';

export namespace AlternanceApiJobsResponse {
	export interface Geopoint {
		type: string,
		coordinates: [number, number]
	}
	export interface Location {
		address: string,
		geopoint: AlternanceApiJobsResponse.Geopoint
	}

	export interface Domain {
		idcc: number | null,
		opco: string | null,
		naf: { code: string, label: string | null } | null
	}

	export interface Workplace {
		name: string | null,
		description: string | null,
		website: string | null,
		siret: string | null,
		location: AlternanceApiJobsResponse.Location,
		brand: string | null,
		legal_name: string | null,
		size: string | null,
		domain: AlternanceApiJobsResponse.Domain,
	}
	export interface Application {
		phone: string | null,
		url: string,
	}

	export namespace Job {
		export interface Identifier {
			id: string | null,
			partner_job_id: string,
			partner_label: string
		}
		export interface Contract {
			start: string | null,
			duration: number | null,
			type: Array<string>,
			remote: string | null
		}
		export interface Offer {
			title: string,
			desired_skills: Array<string>,
			to_be_acquired_skills: Array<string>,
			access_conditions: Array<string>,
			opening_count: number,
			publication: { creation: string | null, expiration: string | null },
			rome_codes: Array<string>,
			description: string,
			status: 'Active' | 'Filled' | 'Cancelled'
			target_diploma: {
				european: string,
				label: string,
			} | null
		}
	}
	export interface Job {
		identifier: AlternanceApiJobsResponse.Job.Identifier,
		workplace: AlternanceApiJobsResponse.Workplace,
		apply: AlternanceApiJobsResponse.Application,
		contract: AlternanceApiJobsResponse.Job.Contract,
		offer: AlternanceApiJobsResponse.Job.Offer
	}

	export interface Recruiter {
		identifier: { id: string },
		workplace: AlternanceApiJobsResponse.Workplace,
		apply: AlternanceApiJobsResponse.Application
	}

	export namespace validationSchema {
		const location = Joi.object({
			address: Joi.string(),
			geopoint: Joi.object({
				coordinates: Joi.array()
					.items(Joi.number())
					.length(2),
				type: Joi.string(),
			}).options({ allowUnknown: true }),
		}).options({ allowUnknown: true });
		const workplace = Joi.object({
			brand: Joi.string().allow(null),
			description: Joi.string().allow(null),
			domain: Joi.object({
				idcc: Joi.number().allow(null),
				naf: Joi.object({
					code: Joi.string(),
					label: Joi.string().allow(null),
				}).allow(null),
				opco: Joi.string().allow(null),
			}).options({ allowUnknown: true }),
			legal_name: Joi.string().allow(null),
			location,
			name: Joi.string().allow(null),
			siret: Joi.string().allow(null),
			size: Joi.string().allow(null),
			website: Joi.string().allow(null),
		}).options({ allowUnknown: true });
		const apply = Joi.object({
			phone: Joi.string().allow(null),
			url: Joi.string(),
		}).options({ allowUnknown: true });

		export const job = Joi.object({
			apply,
			contract: Joi.object({
				duration: Joi.number().allow(null),
				remote: Joi.string().allow(null),
				start: Joi.string().allow(null),
				type: Joi.array().items(Joi.string()),
			}).options({ allowUnknown: true }),
			identifier: Joi.object({
				id: Joi.string().allow(null),
				partner_job_id: Joi.string(),
				partner_label: Joi.string(),
			}).options({ allowUnknown: true }),
			offer: Joi.object({
				access_conditions: Joi.array().items(Joi.string()),
				description: Joi.string(),
				desired_skills: Joi.array().items(Joi.string()),
				opening_count: Joi.number(),
				publication: Joi.object({
					creation: Joi.string().allow(null),
					expiration: Joi.string().allow(null),
				}).options({ allowUnknown: true }),
				rome_codes: Joi.array().items(Joi.string()),
				status: Joi.allow('Active', 'Filled', 'Cancelled'),
				target_diploma: Joi.object({
					european: Joi.string(),
					label: Joi.string(),
				}).allow(null),
				title: Joi.string(),
				to_be_acquired_skills: Joi.array().items(Joi.string()),
			}).options({ allowUnknown: true }),
			workplace,
		}).options({ allowUnknown: true });
		const recruiters = Joi.object({
			apply,
			identifier: Joi.object({ id: Joi.string() }).options({ allowUnknown: true }),
			workplace,
		}).options({ allowUnknown: true });

		export const search = Joi.object({
			jobs: Joi.array().items(job),
			recruiters: Joi.array().items(recruiters),
		})
			.options({ allowUnknown: true, presence: 'required' })
			.required();
	}
}

export interface AlternanceApiJobsResponse {
	jobs: Array<AlternanceApiJobsResponse.Job>
	recruiters: Array<AlternanceApiJobsResponse.Recruiter>
}
