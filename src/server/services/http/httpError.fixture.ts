import { AxiosResponse } from 'axios';

import { HttpError } from '~/server/services/http/httpError';

export function anHttpError(status?: number, message?: string, response?: AxiosResponse): HttpError {
	return new HttpError(status || 500, message || 'An error occurred', response);
}
