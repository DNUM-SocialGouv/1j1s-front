import { AxiosResponse } from 'axios';

export class HttpError extends Error {
	public response?: AxiosResponse;

	constructor (public status: number, message: string, response?: AxiosResponse) {
		super(message);
		this.response = response;
	}
}

export function isHttpError(e: unknown): e is HttpError {
	return e instanceof HttpError;
}
