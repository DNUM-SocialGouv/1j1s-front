export class HttpError extends Error {
	public response?: {
		data: unknown;
	};

	constructor (public status: number, message: string, response?: { data: unknown }) {
		super(message);
		this.response = response;
	}
}

export function isHttpError(e: unknown): e is HttpError {
	return e instanceof HttpError;
}
