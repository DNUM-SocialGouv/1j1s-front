import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

import { applyRateLimit } from '../../../server/middlewares/rateLimit/rateLimit';

export async function enregistrerContactPOEHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	if (await applyRateLimit(req, res)) return;

	if (req.method !== 'POST') {
		return res.status(406).end();
	}
	const response = await dependencies.demandeDeContactDependencies.envoyerDemandeDeContactPOEUseCase.handle(req.body);
	return handleResponse(response, res);
}

export default monitoringHandler(enregistrerContactPOEHandler);
