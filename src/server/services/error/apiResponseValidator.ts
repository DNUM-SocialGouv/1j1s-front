import Joi from 'joi';

import { ValidationErrorClass } from './validationErrorClass';

export function apiResponseValidate(response: unknown, schema: Joi.Schema): ValidationErrorClass | undefined {
	const { error } = schema.validate(response);
	if (error) {
		return new ValidationErrorClass(error.details, error._original);
	}
	return undefined;
}
