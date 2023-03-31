import { AxiosResponse } from 'axios';

import { HttpError } from '~/server/services/http/httpError';
import { anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

export function anHttpError(status?: number, message?: string, response?: AxiosResponse): HttpError {
	return new HttpError(status || 500, message || 'An error occurred', response || anAxiosResponse({
		error: message || 'An error occurred',
		message: message || 'An error occurred',
		status: status || 500,
	}, status || 500));
}
