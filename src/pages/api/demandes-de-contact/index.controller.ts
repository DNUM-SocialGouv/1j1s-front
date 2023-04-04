import { NextApiRequest, NextApiResponse } from 'next';

import { withMethods } from '~/pages/api/middlewares/methods/methods.middleware';
import { withMonitoring } from '~/pages/api/middlewares/monitoring/monitoring.middleware';
import { ErrorHttpResponse } from '~/pages/api/utils/response/response.type';
import { handleResponse } from '~/pages/api/utils/response/response.util';
import { DemandeDeContactType } from '~/server/demande-de-contact/domain/demandeDeContact';
import { createFailure } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { dependencies } from '~/server/start';

export async function enregistrerDemandeDeContactHandler(req: NextApiRequest, res: NextApiResponse<void | ErrorHttpResponse>) {
	const { type } = req.body;
	const command = req.body;
	delete command.type;
	let response;

	switch(type as DemandeDeContactType) {
		case 'CEJ': {
			response = await dependencies.demandeDeContactDependencies.envoyerDemandeDeContactCEJUseCase.handle(req.body);
			break;
		}
		default: {
			response = createFailure(ErreurMétier.DEMANDE_INCORRECTE);
			break;
		}
	}

	return handleResponse(response, res);
}

export default withMonitoring(withMethods(['POST'], enregistrerDemandeDeContactHandler));
