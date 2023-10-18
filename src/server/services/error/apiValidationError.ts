import { ValidationErrorItem } from 'joi';

export class ApiValidationError {
	detailsOfValidationError: ValidationErrorItem[];
	originalResponse: unknown;

	constructor(details: ValidationErrorItem[], _original: unknown) {
		this.detailsOfValidationError = details;
		this.originalResponse = _original;
	}
}
