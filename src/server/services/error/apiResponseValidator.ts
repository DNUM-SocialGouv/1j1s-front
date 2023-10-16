import Joi from 'joi';

import { ValidationError } from './validationError';

export function apiResponseValidate(response: unknown, schema: Joi.Schema): ValidationError | undefined {
	const { error } = schema.validate(response);
	if (error) {
		return new ValidationError(error);
	}
	return undefined;
}
