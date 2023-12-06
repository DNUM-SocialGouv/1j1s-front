import Joi from 'joi';

export interface ApiImmersionFacileStage3emeRechercheResponse {
	name: string
	address: {
		city: string
		postcode: string
		departmentCode: string
		streetNumberAndAddress: string
	}
	romeLabel: string
	contactMode?: string
	numberOfEmployeeRange?: string
	voluntaryToImmersion?: boolean
}

export const apiImmersionFacileStage3emeSchemas = {
	search: Joi.array().items(Joi.object({
		address: Joi.object({
			city: Joi.string(),
			departmentCode: Joi.string(),
			postcode: Joi.string(),
			streetNumberAndAddress: Joi.string(),
		}),
		contactMode: Joi.string(),
		name: Joi.string(),
		numberOfEmployeeRange: Joi.string(),
		romeLabel: Joi.string(),
		voluntaryToImmersion: Joi.boolean(),
	})).options({ allowUnknown: true }),
};
