import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import { dependencies } from '~/server/start';

export async function rechercherFormationInitialeHandler(req: NextApiRequest, res: NextApiResponse<Array<FormationInitiale> | ErrorHttpResponse>) {
	const resultatFormationsInitiales = await dependencies.formationInitialeDependencies.rechercherFormationInitiale.handle();
	return handleResponse(resultatFormationsInitiales, res);
}

export default withMonitoring(rechercherFormationInitialeHandler);

