import Joi from 'joi';

export interface AlternanceApiJobsResponseGeopoint {
	type: string,
	coordinates: [number, number]
}

export interface AlternanceApiJobsResponseLocation {
	address: string,
	geopoint: AlternanceApiJobsResponseGeopoint
}

export interface AlternanceApiJobsResponseDomain {
	idcc: number | null,
	opco: string | null,
	naf: { code: string, label: string | null } | null
}

export interface AlternanceApiJobsResponseWorkplace {
	name: string | null,
	description: string | null,
	website: string | null,
	siret: string | null,
	location: AlternanceApiJobsResponseLocation,
	brand: string | null,
	legal_name: string | null,
	size: string | null,
	domain: AlternanceApiJobsResponseDomain,
}

export interface AlternanceApiJobsResponseApplication {
	phone: string | null,
	url: string,
}

export interface AlternanceApiJobsResponseJobIdentifier {
	id: string | null,
	partner_job_id: string,
	partner_label: string
}

export interface AlternanceApiJobsResponseJobContract {
	start: string | null,
	duration: number | null,
	type: Array<string>,
	remote: string | null
}

export interface AlternanceApiJobsResponseJobOffer {
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

export interface AlternanceApiJobsResponseJob {
	identifier: AlternanceApiJobsResponseJobIdentifier,
	workplace: AlternanceApiJobsResponseWorkplace,
	apply: AlternanceApiJobsResponseApplication,
	contract: AlternanceApiJobsResponseJobContract,
	offer: AlternanceApiJobsResponseJobOffer
}

export interface AlternanceApiJobsResponseRecruiter {
	identifier: { id: string },
	workplace: AlternanceApiJobsResponseWorkplace,
	apply: AlternanceApiJobsResponseApplication
}

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

export const alternanceApiJobsResponseJobSchema = Joi.object({
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

export const alternanceApiJobsResponseValidationSchema = {
	search: Joi.object({
		jobs: Joi.array().items(alternanceApiJobsResponseJobSchema),
		recruiters: Joi.array().items(recruiters),
	})
		.options({ allowUnknown: true, presence: 'required' })
		.required(),
	job: alternanceApiJobsResponseJobSchema,
};

export interface AlternanceApiJobsResponse {
	jobs: Array<AlternanceApiJobsResponseJob>
	recruiters: Array<AlternanceApiJobsResponseRecruiter>
}
