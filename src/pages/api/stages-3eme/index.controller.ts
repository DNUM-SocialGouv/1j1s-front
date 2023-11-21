import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { ResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme';
import { dependencies } from '~/server/start';

export async function rechercherStage3emeHandler(req: NextApiRequest, res: NextApiResponse<ResultatRechercheStage3eme | ErrorHttpResponse>) {
	const resultatsRechercheStage3eme = await dependencies.stage3emeDependencies.rechercherStage3eme.handle();
	return handleResponse(resultatsRechercheStage3eme, res);
}

export default withMonitoring(rechercherStage3emeHandler);
