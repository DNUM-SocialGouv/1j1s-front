import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { applyRateLimit } from '~/server/middlewares/rateLimit/rateLimit';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';

export async function enregistrerEntreprisesHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	if (await applyRateLimit(req, res)) return;

	if (req.method !== 'POST') {
		return res.status(406).end();
	}
	const response = await dependencies.entrepriseDependencies.lesEntreprisesSEngagentUseCase.rejoindreLaMobilisation(req.body);
	return handleResponse(response, res);
}

export default monitoringHandler(enregistrerEntreprisesHandler);
