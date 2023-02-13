import { handleResponse } from '~/pages/api/utils/response/response.util';
import { uneAlternance } from '~/server/alternances/domain/alternance.fixture';
import { createSuccess } from '~/server/errors/either';

export default async function getAlternanceHandler(req, res) {
	return handleResponse(createSuccess(uneAlternance()), res);
}
