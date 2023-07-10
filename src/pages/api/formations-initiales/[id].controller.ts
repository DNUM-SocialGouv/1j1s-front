import { NextApiRequest, NextApiResponse } from 'next';

import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import {
	FormationInitialeDetail,
} from '~/server/formations-initiales/domain/formationInitiale';
import { dependencies } from '~/server/start';

export async function consulterDetailFormationInitialeHandler(req: NextApiRequest, res: NextApiResponse<FormationInitialeDetail | ErrorHttpResponse>) {
	const resultatFormationsInitiales = await dependencies.formationInitialeDependencies.consulterDetailFormationInitiale.handle(String(req.query.id));
	return handleResponse(resultatFormationsInitiales, res);
}


export default withMonitoring(consulterDetailFormationInitialeHandler);
