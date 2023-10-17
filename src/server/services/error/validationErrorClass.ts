import { ValidationErrorItem } from 'joi';

export class ValidationErrorClass extends Error {
	details: ValidationErrorItem[];
	_original: unknown;

	constructor(details: ValidationErrorItem[], _original: unknown) {
		super();
		this.details = details;
		this._original = _original;
	}
}
