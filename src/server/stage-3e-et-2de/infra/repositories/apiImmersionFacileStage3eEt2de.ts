import Joi from 'joi';

export interface ApiImmersionFacileStage3eEt2deRechercheResponse {
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
	voluntaryToImmersion: boolean
	fitForDisabledWorkers: boolean
}

export const apiImmersionFacileStage3eEt2deSchemas = {
	search: Joi.array().items(Joi.object({
		address: Joi.object({
			city: Joi.string(),
			departmentCode: Joi.string(),
			postcode: Joi.string(),
			streetNumberAndAddress: Joi.string().allow(''),
		}).required(),
		contactMode: Joi.string(),
		name: Joi.string().required(),
		romeLabel: Joi.string().required(),
		voluntaryToImmersion: Joi.boolean().required(),
	})).options({ allowUnknown: true }),
};

export interface ApiImmersionFacileStage3eEt2deCandidature {
	potentialBeneficiaryFirstName: string
	potentialBeneficiaryLastName: string
	potentialBeneficiaryEmail: string
	appellationCode: string
	siret: string
	contactMode: string
}
