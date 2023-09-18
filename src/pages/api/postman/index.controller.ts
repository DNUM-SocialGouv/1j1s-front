import { handleResponse } from '~/pages/api/utils/response/response.util';

import { dependencies } from '../../../server/start';


export default async function sendRequest(req, res) {
	const response = await dependencies.postmanDependencies.sendRequest.handle(req.query.url, req.query.body, req.query.ip, req.query.password);
	return handleResponse(response, res);
}
