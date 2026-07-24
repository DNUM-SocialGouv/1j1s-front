import { HttpError } from '~/server/services/http/httpError';
import { anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

const nomStrapiParStatut: Record<number, string> = {
	400: 'BadRequestError',
	401: 'UnauthorizedError',
	403: 'ForbiddenError',
	404: 'NotFoundError',
	500: 'InternalServerError',
	503: 'ServiceUnavailableError',
};

export function aStrapiHttpError(status: number): HttpError {
	const nom = nomStrapiParStatut[status] ?? 'ApplicationError';
	const payloadStrapiV4 = {
		data: null,
		error: {
			details: {},
			message: nom,
			name: nom,
			status,
		},
	};
	// Message vide : les clients HTTP le construisent depuis `data.message`, que le payload Strapi v4 n‘expose pas.
	return new HttpError(status, '', anAxiosResponse(payloadStrapiV4, status));
}
