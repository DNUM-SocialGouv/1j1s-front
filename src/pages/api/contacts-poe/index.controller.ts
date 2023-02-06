import { NextApiRequest, NextApiResponse } from 'next';

import { withMethods } from '~/pages/api/middlewares/methods/methods.middleware';
import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { dependencies } from '~/server/start';

export async function enregistrerContactPOEHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	const response = await dependencies.demandeDeContactDependencies.envoyerDemandeDeContactPOEUseCase.handle(req.body);
	return handleResponse(response, res);
}

export default withMonitoring(withMethods(['POST'], enregistrerContactPOEHandler));
