import Joi from 'joi';

import { ApiValidationError } from './apiValidationError';

export function validateApiResponse<T>(response: T, schema: Joi.Schema): ApiValidationError | undefined {
	const { error } = schema.validate(response);
	if (error) {
		return new ApiValidationError(error.details, error._original);
	}
	return undefined;
}
