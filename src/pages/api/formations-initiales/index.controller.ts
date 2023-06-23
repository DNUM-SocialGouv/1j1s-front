import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import { dependencies } from '~/server/start';

export async function rechercherFormationsInitialesHandler(req: NextApiRequest, res: NextApiResponse<Array<FormationInitiale> | ErrorHttpResponse>) {
	const resultatFormationsInitiales = await dependencies.formationInitialeDependencies.rechercherFormationsInitiales.handle();
	return handleResponse(resultatFormationsInitiales, res);
}
