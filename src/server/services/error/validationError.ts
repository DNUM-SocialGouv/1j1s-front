import { ValidationError } from 'joi';

export class ValidationError extends Error {
	constructor(details: ValidationError) {
		super();
	}
}
