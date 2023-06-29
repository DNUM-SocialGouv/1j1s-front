import { Context } from 'react';

export default class NoProviderError<T> extends Error {
	name = 'NoProviderError';

	constructor(context?: Context<T>) {
		super(`Context provider not found${
			context?.displayName
				? ` for ${context.displayName}`
				: ''}`);
	}
}
