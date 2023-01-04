import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';
import { RésultatsRechercheCommune } from '~/server/localisations/domain/localisationAvecCoordonnées';
import { applyRateLimit } from '~/server/middlewares/rateLimit/rateLimit';
import { monitoringHandler } from '~/server/monitoringHandler.middleware';
import { dependencies } from '~/server/start';
import { handleResponse } from '~/server/utils/handleResponse.util';


export async function rechercherCommuneHandler(req: NextApiRequest, res: NextApiResponse<RésultatsRechercheCommune | ErrorHttpResponse>) {
	if (await applyRateLimit(req, res)) return;

	const résultatRechercheCommunes = await dependencies.localisationDependencies.rechercherCommune.handle(String(req.query.q));
	return handleResponse(résultatRechercheCommunes, res);
}

export default monitoringHandler(rechercherCommuneHandler);
