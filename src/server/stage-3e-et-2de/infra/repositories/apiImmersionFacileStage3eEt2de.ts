import Joi from 'joi';

import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';

export interface ApiImmersionFacileStage3eEt2deRechercheResponse {
	name: string
	address: {
		city: string
		postcode: string
		departmentCode: string
		streetNumberAndAddress: string
	}
	romeLabel: string
	contactMode?: ModeDeContact
	numberOfEmployeeRange?: string
	voluntaryToImmersion: boolean
	fitForDisabledWorkers: boolean
	appellations: Array<{
		appellationCode: string
		appellationLabel: string
	}>
	siret: string
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
